'use client';

import React, { useState } from 'react';
import { Server, Play, Copy, Check, Terminal, Code2, Cpu, Shield, Zap, Sparkles } from 'lucide-react';
import { MCP_TOOLS, McpToolDefinition } from '@/lib/mcp-server';

export default function McpServerConsole() {
  const [selectedTool, setSelectedTool] = useState<McpToolDefinition>(MCP_TOOLS[0]);
  const [paramsInput, setParamsInput] = useState<string>(
    JSON.stringify({ deviceId: 'dev-r1-core', includeInterfaces: true }, null, 2)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [responseOutput, setResponseOutput] = useState<any>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [copiedResult, setCopiedResult] = useState(false);

  const handleSelectTool = (tool: McpToolDefinition) => {
    setSelectedTool(tool);
    // Populate default params
    const defaultParams: Record<string, any> = {};
    Object.entries(tool.inputSchema.properties).forEach(([key, val]) => {
      defaultParams[key] = val.default !== undefined ? val.default : val.type === 'string' ? '' : true;
    });
    setParamsInput(JSON.stringify(defaultParams, null, 2));
    setResponseOutput(null);
  };

  const handleExecute = async () => {
    setIsLoading(true);
    const start = performance.now();
    try {
      let parsedArgs = {};
      try {
        parsedArgs = JSON.parse(paramsInput);
      } catch (e) {
        alert('Invalid JSON in parameters field');
        setIsLoading(false);
        return;
      }

      const res = await fetch('/api/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: Math.floor(Math.random() * 10000),
          method: 'tools/call',
          params: {
            name: selectedTool.name,
            arguments: parsedArgs
          }
        })
      });

      const data = await res.json();
      setLatencyMs(Math.round(performance.now() - start));
      setResponseOutput(data);
    } catch (err: any) {
      setResponseOutput({ error: err.message });
      setLatencyMs(Math.round(performance.now() - start));
    } finally {
      setIsLoading(false);
    }
  };

  const claudeDesktopConfig = JSON.stringify({
    mcpServers: {
      "netpulse-guardian": {
        "command": "node",
        "args": ["packages/mcp-server/index.js"],
        "env": {
          "NETPULSE_GATEWAY_URL": "https://youthgrowthfoundation.vercel.app/api/mcp"
        }
      }
    }
  }, null, 2);

  const copyConfig = () => {
    navigator.clipboard.writeText(claudeDesktopConfig);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const copyResult = () => {
    if (responseOutput) {
      navigator.clipboard.writeText(JSON.stringify(responseOutput, null, 2));
      setCopiedResult(true);
      setTimeout(() => setCopiedResult(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 rounded-2xl border border-blue-500/30 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Server className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white">Model Context Protocol (MCP) Server for Network Devices</h2>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                RFC JSON-RPC 2.0
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Provides standardized MCP tool endpoints for AI agents (Claude, GPT, Hermes, Cursor) to autonomously inspect Cisco/Juniper/VyOS routers, query interface statistics, forecast congestion via LSTM, optimize SDN flow tables, and enforce firewall eBPF mitigation rules.
            </p>
          </div>

          <button
            onClick={copyConfig}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold shadow-sm transition-colors"
          >
            {copiedConfig ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copiedConfig ? 'Copied to Clipboard!' : 'Copy claude_desktop_config.json'}</span>
          </button>
        </div>
      </div>

      {/* Main Console Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Registered Tools List */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-blue-500" />
              <span>Available MCP Tools ({MCP_TOOLS.length})</span>
            </h3>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              tools/list
            </span>
          </div>

          <div className="space-y-2.5">
            {MCP_TOOLS.map((tool) => {
              const isSelected = selectedTool.name === tool.name;
              return (
                <div
                  key={tool.name}
                  onClick={() => handleSelectTool(tool)}
                  data-testid={`mcp-tool-${tool.name}`}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500/50 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-950/30 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                      {tool.name}
                    </span>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {Object.keys(tool.inputSchema.properties).length} params
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Invocation & JSON-RPC Inspector */}
        <div className="lg:col-span-7 space-y-4">
          {/* Tool Parameters Form & Action */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-emerald-500" />
                  <span>Execute Tool: <code className="text-blue-600 dark:text-blue-400 font-mono text-xs ml-1">{selectedTool.name}</code></span>
                </h3>
              </div>
              <button
                onClick={handleExecute}
                disabled={isLoading}
                data-testid="execute-mcp-tool-btn"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <Zap className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
                <span>{isLoading ? 'Executing JSON-RPC...' : 'Run Tool'}</span>
              </button>
            </div>

            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Input Schema & Tool Arguments (JSON)
            </label>
            <textarea
              value={paramsInput}
              onChange={(e) => setParamsInput(e.target.value)}
              rows={5}
              className="w-full font-mono text-xs p-3 rounded-xl bg-slate-950 text-emerald-400 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 selection:bg-blue-900"
            />
          </div>

          {/* JSON-RPC Response Output */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-sm relative text-slate-200">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-200 font-mono">JSON-RPC 2.0 Response Inspector</span>
                {latencyMs !== null && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                    {latencyMs} ms
                  </span>
                )}
              </div>

              {responseOutput && (
                <button
                  onClick={copyResult}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
                >
                  {copiedResult ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedResult ? 'Copied' : 'Copy JSON'}</span>
                </button>
              )}
            </div>

            <pre className="font-mono text-xs text-slate-300 max-h-72 overflow-y-auto p-1 leading-relaxed whitespace-pre-wrap">
              {responseOutput
                ? JSON.stringify(responseOutput, null, 2)
                : '// Click "Run Tool" to invoke this MCP capability on live network devices'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

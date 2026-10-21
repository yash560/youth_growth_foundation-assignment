import { NextRequest, NextResponse } from 'next/server';
import { MCP_TOOLS, executeMcpTool } from '@/lib/mcp-server';

export async function GET() {
  return NextResponse.json({
    status: 'online',
    protocolVersion: '2024-11-05',
    serverInfo: {
      name: 'NetPulse Device MCP Server',
      version: '1.0.0',
      description: 'Model Context Protocol (MCP) Server for Cisco, Juniper, VyOS, Fortinet, and pfSense networking devices'
    },
    capabilities: {
      tools: {
        listChanged: true
      },
      resources: {},
      prompts: {}
    },
    totalTools: MCP_TOOLS.length,
    tools: MCP_TOOLS
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support JSON-RPC 2.0
    const id = body.id !== undefined ? body.id : 1;
    const method = body.method;

    if (method === 'initialize') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {}
          },
          serverInfo: {
            name: 'NetPulse Device MCP Server',
            version: '1.0.0'
          }
        }
      });
    }

    if (method === 'tools/list') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        result: {
          tools: MCP_TOOLS
        }
      });
    }

    if (method === 'tools/call') {
      const toolName = body.params?.name;
      const toolArgs = body.params?.arguments || {};

      if (!toolName) {
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          error: {
            code: -32602,
            message: 'Invalid params: tool name is required'
          }
        }, { status: 400 });
      }

      const toolResult = await executeMcpTool(toolName, toolArgs);

      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify(toolResult, null, 2)
            }
          ]
        }
      });
    }

    // Direct invocation fallback (REST format: { tool: "...", args: { ... } })
    if (body.tool) {
      const toolResult = await executeMcpTool(body.tool, body.args || {});
      return NextResponse.json({
        success: true,
        tool: body.tool,
        result: toolResult
      });
    }

    return NextResponse.json({
      jsonrpc: '2.0',
      id,
      error: {
        code: -32601,
        message: `Method not found: ${method}`
      }
    }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32603,
        message: error.message || 'Internal server error'
      }
    }, { status: 500 });
  }
}

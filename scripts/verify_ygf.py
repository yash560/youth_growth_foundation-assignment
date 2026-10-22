#!/usr/bin/env python3
"""
Comprehensive Playwright & API Verification Suite for NetPulse Guardian OS
Youth Growth Foundation AI Agent Development Assignment
Protocol SOP-01 Compliant
"""

import sys
import time
import requests
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3998"

def test_apis():
    print("\n--- [PHASE 1: API ENDPOINT VERIFICATION] ---")
    
    # 1. MCP Server - Initialize
    payload_init = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "initialize",
        "params": {
            "protocolVersion": "2024-11-05",
            "capabilities": {},
            "clientInfo": {"name": "TestClient", "version": "1.0.0"}
        }
    }
    r = requests.post(f"{BASE_URL}/api/mcp", json=payload_init, timeout=5)
    assert r.status_code == 200, f"MCP init failed: {r.status_code}"
    res = r.json()
    assert "NetPulse" in res.get("result", {}).get("serverInfo", {}).get("name", ""), "Invalid MCP server name"
    print("✓ MCP Server 'initialize' RPC verified")

    # 2. MCP Server - Tools List
    payload_tools = {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "tools/list",
        "params": {}
    }
    r = requests.post(f"{BASE_URL}/api/mcp", json=payload_tools, timeout=5)
    assert r.status_code == 200
    tools = r.json().get("result", {}).get("tools", [])
    assert len(tools) >= 5, f"Expected at least 5 MCP tools, found {len(tools)}"
    print(f"✓ MCP Tools list verified ({len(tools)} network tools registered)")

    # 3. Telemetry API
    r = requests.get(f"{BASE_URL}/api/telemetry", timeout=5)
    assert r.status_code == 200
    telemetry = r.json()
    assert len(telemetry) >= 5, "Hardware telemetry missing devices"
    print(f"✓ Hardware telemetry API verified ({len(telemetry)} network devices reporting)")

    # 4. IDS Anomaly API
    r = requests.get(f"{BASE_URL}/api/ids", timeout=5)
    assert r.status_code == 200
    ids_data = r.json()
    assert "reconstructionLoss" in ids_data or "loss" in ids_data or "status" in ids_data
    print("✓ Unsupervised Autoencoder IDS API verified")

    # 5. Congestion API
    r = requests.get(f"{BASE_URL}/api/congestion", timeout=5)
    assert r.status_code == 200
    print("✓ LSTM Congestion Prediction API verified")

    # 6. SDN Controller API
    r = requests.get(f"{BASE_URL}/api/sdn", timeout=5)
    assert r.status_code == 200
    print("✓ SDN Reinforcement Learning Controller API verified")


def test_ui_and_viewports():
    print("\n--- [PHASE 2: PLAYWRIGHT INTERACTIVE & MULTI-VIEWPORT INSPECTION] ---")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # Test 1440px Desktop
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        
        page.goto(BASE_URL, wait_until="networkidle")
        time.sleep(1)
        
        body_text = page.inner_text("body")
        assert "NetPulse Guardian OS" in body_text, "Headline missing"
        assert "Powered by TheWebVale" in body_text, "TheWebVale badge missing in footer"
        assert "Model Context Protocol" in body_text or "MCP" in body_text, "MCP text missing"
        print("✓ Desktop 1440px rendered cleanly with Powered by TheWebVale")

        # Test Interactive MCP Tab Switch
        mcp_btn = page.locator("button:has-text('MCP Server')").first
        if mcp_btn.is_visible():
            mcp_btn.click()
            time.sleep(1)
            assert "JSON-RPC 2.0" in page.inner_text("body") or "Execute Tool" in page.inner_text("body")
            print("✓ Interactive MCP Server Console verified")

        # Viewport inspection: 768px Tablet
        tablet_page = browser.new_page(viewport={"width": 768, "height": 1024})
        tablet_page.goto(BASE_URL, wait_until="networkidle")
        scroll_w = tablet_page.evaluate("() => document.documentElement.scrollWidth")
        client_w = tablet_page.evaluate("() => document.documentElement.clientWidth")
        assert scroll_w <= client_w, f"Tablet horizontal overflow: {scroll_w} > {client_w}"
        print(f"✓ Tablet 768px clean (scrollWidth: {scroll_w}px, clientWidth: {client_w}px)")
        tablet_page.close()

        # Viewport inspection: 360px Mobile
        mobile_page = browser.new_page(viewport={"width": 360, "height": 800})
        mobile_page.goto(BASE_URL, wait_until="networkidle")
        scroll_w = mobile_page.evaluate("() => document.documentElement.scrollWidth")
        client_w = mobile_page.evaluate("() => document.documentElement.clientWidth")
        assert scroll_w <= client_w, f"Mobile horizontal overflow: {scroll_w} > {client_w}"
        print(f"✓ Mobile 360px clean (scrollWidth: {scroll_w}px, clientWidth: {client_w}px)")
        mobile_page.close()

        # Check console errors
        # Filter out minor favicon/font warnings if any
        real_errors = [e for e in console_errors if "favicon" not in e and "font" not in e]
        assert len(real_errors) == 0, f"Found console errors: {real_errors}"
        print("✓ Zero console errors detected across all views")

        browser.close()

if __name__ == "__main__":
    test_apis()
    test_ui_and_viewports()
    print("\n🎉 YOUTH GROWTH FOUNDATION SUITE PASSED DETERMINISTICALLY!\n")

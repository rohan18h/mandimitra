"""
MandiMitra — Python Full-Stack Runner
Starts the Python Flask backend & web server
"""

import sys
import os

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from app import app

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3000))
    print("=" * 60)
    print("MandiMitra - Python Full-Stack Server Starting...")
    print(f"Accessible at: http://localhost:{port}/")
    print(f"API Health Check: http://localhost:{port}/api/health")
    print("=" * 60)
    app.run(host="0.0.0.0", port=port, debug=False, threaded=True)

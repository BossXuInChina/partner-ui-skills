"""Keep JSON output and errors usable with Unicode paths in Windows pipes."""
import sys


def configure_cli_encoding():
    if sys.platform == 'win32':
        for stream in (sys.stdout, sys.stderr):
            if hasattr(stream, 'reconfigure'):
                stream.reconfigure(encoding='utf-8', errors='backslashreplace')

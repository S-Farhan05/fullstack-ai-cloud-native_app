import logging
from typing import Optional

# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)


def get_logger(name: Optional[str] = None) -> logging.Logger:
    """Get a logger instance with the given name"""
    if name:
        return logging.getLogger(name)
    return logger
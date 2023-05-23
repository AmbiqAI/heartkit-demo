import logging

from rich.logging import RichHandler

from .defines import HeartTask, get_class_names
from .defines import HKResult


def hkresult_to_str(result: HKResult) -> str:
    """Format HKResult into string for printing"""
    rhythym_names = get_class_names(HeartTask.hrv)
    num_beats = result.num_norm_beats + result.num_pac_beats + result.num_pvc_beats
    rhythm = "ARRHYTHMIA" if result.arrhythmia else rhythym_names[result.heart_rhythm]
    return (
        "--------------------------\n"
        "**** HeartKit Results ****\n"
        "--------------------------\n"
        f"  Heart Rate: {result.heart_rate}\n"
        f"Heart Rhythm: {rhythm}\n"
        f" Total Beats: {num_beats}\n"
        f"  Norm Beats: {result.num_norm_beats}\n"
        f"   PAC Beats: {result.num_pac_beats}\n"
        f"   PVC Beats: {result.num_pvc_beats}\n"
        f"  Arrhythmia: {'Detected' if result.arrhythmia else 'Not Detected'}\n"
    )

def setup_logger(log_name: str) -> logging.Logger:
    """Setup logger with Rich

    Args:
        log_name (str): _description_

    Returns:
        logging.Logger: _description_
    """
    logger = logging.getLogger(log_name)
    if logger.handlers:
        return logger
    logging.basicConfig(level=logging.ERROR, force=True, handlers=[RichHandler()])
    logger.propagate = False
    logger.setLevel(logging.INFO)
    logger.handlers = [RichHandler()]
    return logger

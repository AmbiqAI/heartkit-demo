import time
import argparse
from multiprocessing import Process
from functools import partial
from .defines import HeartDemoParams
from .utils import setup_logger
from .evb import EvbHandler
from . import server as rest
from . import ui

logger = setup_logger(__name__)


def demo(params: HeartDemoParams):
    """Run HeartKit demo

    Args:
        params (HeartDemoParams): Demo parameters
    """
    evb_handler = None
    rest_proc = None
    ui_proc = None
    run = True

    if params.rest_address:
        logger.info('Dispatching REST server')
        rest_proc = Process(target=rest.run_forever, daemon=True)
        rest_proc.start()

    if params.frontend == "console":
        logger.info('Dispatching console UI')
        ui_proc = Process(target=partial(ui.run_forever, params.rest_address), daemon=True)
        ui_proc.start()

    while run:
        try:
            logger.info('Starting EVB handler')
            evb_handler = EvbHandler(params=params)
            evb_handler.startup()
            evb_handler.run_forever()
        except KeyboardInterrupt:
            logger.info("Server stopping")
            run = False
        except Exception as err:  # pylint: disable=broad-except
            logger.exception(f"Unhandled error {err}")
            time.sleep(1)
            run = True
        finally:
            if evb_handler:
                evb_handler.shutdown()
                evb_handler = None
    # END WHILE
    if ui_proc:
        ui_proc.terminate()
        ui_proc = None
    if rest_proc:
        rest_proc.terminate()
        rest_proc = None


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="HeartKit demo", prog="HeartKit demo")
    parser.add_argument('--config', type=str, help='Config file')
    args = parser.parse_args()
    demo(HeartDemoParams.parse_file(args.config))

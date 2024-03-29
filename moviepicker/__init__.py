# indicates this directory moviepicker is a package

# print("-----------------------------")
# print("-- __init__.py moviepicker --")
# print("-----------------------------")
from .moviepicker import MMediaLib,MMedia,REVERSE,FORWARD,PICKLED_MEDIA_LIB_FILE_V2_TIMEBOX,PICKLED_MEDIA_LIB_FILE_V2_F500,PICKLED_MEDIA_LIB_FILE_REPO,PICKLED_MEDIA_LIB_FILE_OSX4T,KNOWN_PATHS
#from .display import Player, display_test
from .vlc_http import vlc_http, kill_running_vlc
#from .helpers import creation_date, hr_readable_from_nix
#from .exceptions import *
#from .retrieval import get_hires_cover, find_wiki_url_for_movie, get_lead_image_from_wikipedia

# print(dir())

__version__ = (0, 0, 1)


# note on access to functionality in different files - EG display
# https://stackoverflow.com/questions/2618425/exposing-classes-inside-modules-within-a-python-package-directly-in-the-package
#
# different approches - READ in FULL
# https://towardsdatascience.com/whats-init-for-me-d70a312da583

# project sturcture
# https://python-docs.readthedocs.io/en/latest/writing/structure.html

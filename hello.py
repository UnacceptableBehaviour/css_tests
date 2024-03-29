#! /usr/bin/env python

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
from flask import Flask, render_template, request, jsonify, make_response
app = Flask(__name__)

# debug
from pprint import pprint           # giza a look
import inspect                      # inspect.getmembers(object[, predicate])


#        dir        file
# this causes __init_.py to execute
from moviepicker import MMediaLib,MMedia,REVERSE,FORWARD
from moviepicker import PICKLED_MEDIA_LIB_FILE_V2_TIMEBOX,PICKLED_MEDIA_LIB_FILE_V2_F500,PICKLED_MEDIA_LIB_FILE_REPO
from moviepicker import PICKLED_MEDIA_LIB_FILE_OSX4T, KNOWN_PATHS
from pathlib import Path
import random
import re                                                               # regex
import socket
import copy

import sys
from PyQt5 import QtWidgets, QtGui, QtCore

import subprocess
from time import sleep
import vlc
from moviepicker import vlc_http, kill_running_vlc    # needs an instance of vlc running

vlc_http_channel = None
movie_process = None
media_lib = None


# load info if 1st time round
# media_lib = MMediaLib(PICKLED_MEDIA_LIB_FILE_V2_TIMEBOX)
#
# check for available discs and merge them
#
# if MMediaLib.exists(PICKLED_MEDIA_LIB_FILE_V2_F500):
#     media_lib.join(MMediaLib(PICKLED_MEDIA_LIB_FILE_V2_F500))
default_library_name = 'medialib2.pickle'

volume_checklist = KNOWN_PATHS
test_mode_library_name = Path('/Users/simon/a_syllabus/lang/python/movie_picker/movies/__media_data2/medialib2.pickle')

import platform
running_os = platform.system()
# AIX: 'aix', Linux:'linux', Windows: 'win32', Windows/Cygwin: 'cygwin', macOS: 'darwin'
running_os_release = platform.release()

# hostname = socket.gethostname()
# print("Your Computer Name is:" + hostname)
# IPAddr = socket.gethostbyname(hostname)
# print("Your Computer IP Address is:" + IPAddr)
# print(f"OS: {running_os} - {running_os_release}")
IPAddr = '192.168.1.13' # TODO FIX - aBOVE
hostname = 'dtk.health'

if IPAddr == '192.168.1.13':    # local - osx box
    REMOTE_LINUX = Path('/Volumes/Home Directory/MMdia/__media_data2/medialib2.pickle')

    # vcl = []
    # for path in volume_checklist:
    #     full_path = Path('Volumes', path)
    #     vcl.append(full_path) if full_path.exists()
    # load medialibs & merge TODO

    for media_path in volume_checklist:
        if media_path.exists():
            media_lib = MMediaLib(media_path)
            #media_lib = MMediaLib(PICKLED_MEDIA_LIB_FILE_V2_F500)
            #media_lib = MMediaLib(PICKLED_MEDIA_LIB_FILE_REPO)
            #media_lib = MMediaLib(REMOTE_LINUX)
            #media_lib.rebase_media_DB('/Volumes/FAITHFUL500/','/Volumes/Home Directory/MMdia/')
            #media_lib = MMediaLib(PICKLED_MEDIA_LIB_FILE_OSX4T)
            if media_path == PICKLED_MEDIA_LIB_FILE_OSX4T:
                media_lib.rebase_media_DB('/Volumes/meep/temp_delete/','/Volumes/Osx4T/')

    # local disc - small library - export FLASK_ENV=development
    #media_lib = MMediaLib(test_mode_library_name)   < DOESNT exit & files too small to recreate!

elif IPAddr == '192.168.1.16':  # remote - linux box
    LOCAL_LINUX = Path('/home/pi/MMdia/','__media_data2/medialib2.pickle')
    media_lib = MMediaLib(LOCAL_LINUX)
    media_lib.rebase_media_DB('/Volumes/FAITHFUL500/','/home/pi/MMdia/')

if not media_lib:
    print("EXITIING - NO media libraries were found")
    sys.exit(0)

LOCAL_IMAGE_CACHE = Path('./static/covers')
LOCAL_IMAGE_CACHE.mkdir(parents=True, exist_ok=True)

media_lib.cache_images_locally(LOCAL_IMAGE_CACHE)
print(f"LOADED: {len(media_lib)}")
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




# each app.route is an endpoint
@app.route('/', methods=["GET", "POST"])
def db_hello_world():

    # catch this in JS land - if multiple devices connect
    # TODO - think through multiuser use cases
    # back to selections menu - kill movie window
    global movie_process
    global vlc_http_channel


    if movie_process:
        # record movie and place in movie - if reselected restart where left off!! MVTODO
        movie_process.kill()
        movie_process = None
    kill_running_vlc()
    vlc_http_channel = None

    if request.method == 'POST':
        print("db_hello_world: request.method == 'POST'")
        pprint(request.args)
        for key in request.args.keys():
            print(f"{key} - {request.args[key]}")
        #print(request.form['bt-short'])
        print(request.form.get('bt-short'))
    else:
        print(f"db_hello_world: request.method == {request.method}")
        pprint(request)
    print(f"db_hello_world: - - - - - - - - debug")

    test_version = '0.0.0'
    print(f"Vs: {test_version}")
    headline_py = "movies"
    movies = [] # load jsonfile
    all_movies = []
    bad_labels = []
    genres = set()


    for count, movie in enumerate(media_lib.sorted_by_year()):
    #for count, movie in enumerate(media_lib.sorted_by_year(REVERSE)):
    #for count, movie in enumerate(media_lib.sorted_by_most_recently_added(REVERSE)):
        #if count >= 10: break
        #print(movie)
        genres.update(movie.info['genres'])
        if movie.info['title'] == 'And Then There Were None':
            bad_labels.append(movie)
        else:
            if movie.info['hires_image'] == None: movie.info['hires_image'] = 'movie_image_404.png'
            movie.info['hires_image'] = str(Path(movie.info['hires_image']).name)   # convert full path to name
            all_movies.append(movie.info)

    # choose a small random set of movies - for quick debug
    num_of_random_movies = 10
    for i in range(num_of_random_movies):
        movies.append(random.choice(all_movies))


    # print("Incorrectly classified:")
    # for movie in bad_labels:
    #     print(Path(movie.info['file_path']).name)
    #
    # pprint(movies[9])
    # print(" - - - - ")
    print("Genres encountered:")
    print(','.join(genres))
    print("= = = \n")

    #return render_template('gallery.html', movies=movies)
    return render_template('gallery_grid.html', movies=movies)

@app.route('/play_movie/<movie_id>', methods=["GET", "POST"])
def play_movie(movie_id):
    # copy so as not to change objects in media lib to strings
    movie = copy.copy(media_lib.media_with_id(movie_id))
    movie['cast'] = [ str(mv) for mv in movie['cast'] ]
    movie['file_path'] = str(movie['file_path'])
    movies = [movie]

    global vlc_http_channel
    global movie_process

    # fire up VLC and a connection to it
    if movie_process == None:
        print(f"\n\n\n-=-=-=-=- STARTING MOVIE -=-=-=-=-\n")
        movie_process = subprocess.Popen(f"exec /Applications/VLC.app/Contents/MacOS/VLC -f '{movie['file_path']}' --extraintf http", shell=True)
        # how to get a callback on processed termination
        # https://wiki.videolan.org/Documentation:Advanced_Use_of_VLC/
        # how to open in full screen mode - need to check first? & toggle
        # direct command better
        sleep(0.5)
        print(f"\n-=-=-=-=- STARTING MOVIE -=-=-=-=-\n\n\n")

    if vlc_http_channel == None:
        print(f"\n\n\n-=-=-=-=- CONNECTING -=-=-=-=-\n")
        vlc_http_channel = vlc_http(user='', pwd='p1')
        print(type(vlc_http_channel))
        print(f"\n-=-=-=-=- CONNECTING -=-=-=-=-\n\n\n")


    # https://pythonise.com/series/learning-flask/flask-and-fetch-api
    if request.method == 'POST':
        print("play_movie: request.method == 'POST'")
        req = request.get_json()
        print(req)
        print('- - - - PLAYING')
        print(f"vlc_http_channel PRESENT?: {type(vlc_http_channel)} <")
        print(f"media file path: { req['path'] } <")
        print(f"file exists: { Path(req['path']).exists() } <")

        if vlc_http_channel != None and Path(req['path']).exists():
            if req['cmd'] == 'start':
                print('--: start: goto begining after opening sequences')
                vlc_http_channel.seek_from_start(210) # got 3m30

            if req['cmd'] == 'bak30s':
                print('--: bak30s')
                vlc_http_channel.seek(-30)

            if req['cmd'] == 'play':
                print('--: play')
                vlc_http_channel.play()

            if req['cmd'] == 'pause':
                print('--: pause')
                vlc_http_channel.pause()

            if req['cmd'] == 'fwd30s':
                print('--: fwd30s')
                vlc_http_channel.seek(30)


# vlc_http_channel.media_length()         # length =  '5592',
# vlc_http_channel.rate()                 # rate = '1',
# vlc_http_channel.pos()                  # position = '0.00087705912301317'
# vlc_http_channel.api_v()                # apiversion = '3'
# vlc_http_channel.is_fullscreen()        # fullscreen = 'false'
# vlc_http_channel.volume()               # volume =  '160'

            if req['cmd'] == 'end':
                print('--: end: button Goto END before credits')
                movie_length = vlc_http_channel.media_length()
                near_end_of_flick = movie_length - 360
                vlc_http_channel.seek_from_start(near_end_of_flick) # got end - 6m

            if req['cmd'] == 'bak4x':
                print('--: bak2x - NOT IMPLEMENTED')
                #vlc_http_channel.set_rate(-4.0)

            if req['cmd'] == 'vol':
                # 0-100
                new_vol = int(req['vol'])
                print(f'--: vol:{new_vol}')
                vlc_http_channel.set_volume(new_vol)

            if req['cmd'] == 'fwd2x':       # if click second time return to normal speed
                if vlc_http_channel.rate() > 3.5:
                    print('--: fwd4x - playback NORMAL')
                    vlc_http_channel.set_rate(1)
                else:
                    print('--: fwd4x - playback x4')
                    vlc_http_channel.set_rate(4.0)

            if req['cmd'] == 's1':
                print('--: s1')

            if req['cmd'] == 's2':
                print('--: s2')


            print(f"CMD: {req['cmd']}")
            #print(f"VOL:   {vlc_http_channel.volume()}")  # TODO implement functionality
            #print(f"TITLE: {vlc_http_channel.title()}")
            #print(f"FILE:  {vlc_http_channel.filename()}")
            #print(f"RATE:  {vlc_http_channel.rate()}")
            # print(f"FULLSC:{vlc_http_channel.is_fullscreen()}")
            # secs = int(vlc_http_channel.media_length())
            # m, s = divmod(secs, 60)     # / 60 ret div & mod into m, s
            # h, m = divmod(m, 60)
            # print(f"LEN:   {secs} - {h}h{m}m")
            # pos = vlc_http_channel.position()
            # pos_secs = int(secs * float(pos))
            # m, s = divmod(pos_secs, 60)     # / 60 ret div & mod into m, s
            # h, m = divmod(m, 60)
            # print(f"POS:   {pos} - {h}h{m}m")

            #print(f" {vlc_http_channel.}")

        res = make_response(jsonify({"message": "OK"}), 200)
        return res

    else:
        print(f"play_movie: request.method == {request.method}")

    print(f"play_movie: movie ID:{movie_id}")

    return render_template('play_movie.html', movies=movies)

@app.route('/db_movie_page', methods=["GET", "POST"])
def db_movie_page():
    movies = []
    return render_template('index.html', movies=movies)

@app.route('/css_course_1', methods=["GET", "POST"])
def css_course_1():
    headline_py = "css_course_1"
    movies = []
    return render_template('css_course_1.html', movies=movies)

@app.route('/css_course_2', methods=["GET", "POST"])
def css_course_2():
    headline_py = "css_course_2.html"
    movies = []
    return render_template('css_course_2.html', movies=movies)

@app.route('/css_course_3', methods=["GET", "POST"])
def css_course_3():
    headline_py = "css_course_3.html"
    movies = []
    return render_template('css_course_3.html', movies=movies)

@app.route('/css_course_4', methods=["GET", "POST"])
def css_course_4():
    headline_py = "css_course_4.html"
    movies = []
    return render_template('css_course_4.html', movies=movies)

@app.route('/css_course_5', methods=["GET", "POST"])
def css_course_5():
    headline_py = "css_course_5.html"
    movies = []
    return render_template('css_course_5.html', movies=movies)

@app.route('/css_course_6', methods=["GET", "POST"])
def css_course_6():
    headline_py = "css_course_6.html"
    movies = []
    return render_template('css_course_6.html', movies=movies)

@app.route('/css_course_7', methods=["GET", "POST"])
def css_course_7():
    headline_py = "css_course_7.html"
    movies = []
    return render_template('css_course_7.html', movies=movies)

@app.route('/slider_tests_rcp', methods=["GET", "POST"])
def slider_tests_rcp():
    return render_template('recipe_sliders.html')

@app.route('/slider_tests', methods=["GET", "POST"])
def slider_tests():
    movies = []
    all_slider_movies = []
    bad_labels = []
    genres = set()

    print('> > /slider_tests')
    print(f"media_lib size: {len(media_lib)}")
    for count, movie in enumerate(media_lib.sorted_by_year()):
        #pprint(movie)
        genres.update(movie.info['genres'])
        if movie.info['title'] == 'And Then There Were None':
            bad_labels.append(movie)
        else:
            if movie.info['hires_image'] == None: movie.info['hires_image'] = 'movie_image_404.png'
            movie.info['hires_image'] = str(Path(movie.info['hires_image']).name)   # convert full path to name
            slider_movie = {}
            slider_movie['id'] = movie.info['id']
            slider_movie['hires_image'] = movie.info['hires_image']
            slider_movie['genres'] = movie.info['genres']
            #slider_movie[''] = movie.info['']
            all_slider_movies.append(slider_movie)

    # choose a small random set of movies - for quick debug
    num_of_random_movies = 100
    for i in range(num_of_random_movies):
        movies.append(random.choice(all_slider_movies))

    print("Bad Labels encountered:")
    pprint(bad_labels)
    print("= = = \n\n")
    print("Genres encountered:")
    print(','.join(genres))
    print("= = = \n")

    #return render_template('slider_tests.html', movies=all_slider_movies)
    return render_template('slider_tests.html', movies=movies)

@app.route('/css_course_X', methods=["GET", "POST"])
def css_course_X():
    headline_py = "css_course_X.html"
    movies = []
    return render_template('css_course_X.html', movies=movies)

@app.route('/settings', methods=["GET", "POST"])
def settings():
    headline_py = "Settings"
    movies = []
    return render_template('index.html', movies=movies)

@app.route('/spare_route', methods=["GET", "POST"])
def spare_route():
    headline_py = "spare_route"
    movies = []
    return render_template('index.html', movies=movies)

@app.route('/buttons_inputs', methods=["GET", "POST"])
def buttons_inputs():
    headline_py = "buttons_inputs"
    movies = []
    return render_template('index.html', movies=movies)


if __name__ == '__main__':
    # setup notes:
    # http://flask.pocoo.org/docs/1.0/config/
    # export FLASK_ENV=development add to ~/.bash_profile
    #app.run(host='0.0.0.0', port=52001)
    #hostname = socket.gethostname()
    print("Your Computer Name is:" + hostname)
    #IPAddr = socket.gethostbyname(hostname)
    print("Your Computer IP Address is:" + IPAddr)

    if IPAddr == '192.168.1.13':
        #app.run(host='192.168.1.13', port=52001)
        app.run(host='0.0.0.0', port=52001)

    elif IPAddr == '192.168.1.16':
        app.run(host='192.168.1.16', port=52001)

    else:
        pprint(IPAddr)
        print("WARNING unknown host . . . bailing")
        sys.exit(0)

    # check this forum - VLC remote contol
    # https://forum.videolan.org/viewtopic.php?f=11&t=148606
    # add control interface for post movies select

    #
    #
    #
    #  have a look at source code for https://pypi.org/project/black/
    #
    #  Can run as script or module - w/ options
    #
    #  > black {source_file_or_directory}           # To get started right away with sensible defaults
    #
    # > python -m black {source_file_or_directory}  # You can run Black as a package if running it as a script doesn't work:
    #
    #
    #

    # media_lib = MMediaLib()
    #
    # ten_movies = ''
    # for count, movie in enumerate(media_lib.sorted_by_year(REVERSE)):
    #     #print(movie)
    #     #print(movie.as_json)
    #     t = movie.info['title']
    #     y = movie.info['year']
    #     print(f"'{t} ({y} film)',")
    #     if count >= 20: break


# EG movie:
# <class 'movie_info_disk.MMdia'>.movie_data
# {'cast': ["Chris Hemsworth",
#           <Person id:0788335[http] name:_Michael Shannon_>,
#           <Person id:0671567[http] name:_Michael Pena_>,
#               .
#               .
#           <Person id:1041023[http] name:_Navid Negahban_>,
#           <Person id:7540945[http] name:_Matthew Velez_>,
#           <Person id:8918749[http] name:_Sandra L. Velez_>,
#           <Person id:8642817[http] name:_David White_>,
#           <Person id:9001165[http] name:_Sarrett Williams_>],
#  'fav': False,
#  'file_name': '12.Strong.2018.1080p.BluRay.mp4',
#  'file_path': PosixPath('/Volumes/FAITHFUL500/15_rpi_shortlist/12 Strong (2018) [BluRay] [1080p]/12.Strong.2018.1080p.BluRay.mp4'),
#  'file_stats': os.stat_result(st_mode=33279, st_ino=29718973, st_dev=16777232, st_nlink=1, st_uid=501, st_gid=20, st_size=4096, st_atime=1593471600, st_mtime=1583265248, st_ctime=1583265248),
#  'file_title': '12 Strong',
#  'genres': ['Action', 'Drama', 'History', 'War'],
#  'hires_image': PosixPath('12_Strong_poster.jpg'),
#  'id': '1413492',
#  'image_url': 'https://m.media-amazon.com/images/M/MV5BNTEzMjk3NzkxMV5BMl5BanBnXkFtZTgwNjY2NDczNDM@._V1_SY150_CR0,0,101,150_.jpg',
#  'kind': 'movie',
#  'movie_data_loaded': True,
#  'rating': 6.6,
#  'runtime_hm': '2h10m',
#  'runtime_m': '130',
#  'seen': False,
#  'synopsis': 'Mitch Nelson, a US Army Captain with Green Berets Operational '
#               .
#               .
#              'alongside Northern Alliance leader Abdul Rashid Dostum..',
#  'title': '12 Strong',
#  'when_added': None,
#  'year': '2018'}

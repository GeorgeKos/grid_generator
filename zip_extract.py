import sys,os,zipfile



def get_download_path():
    """Returns the default downloads path for linux or windows"""
    if os.name == 'nt':
        import winreg
        sub_key = r'SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders'
        downloads_guid = '{374DE290-123F-4565-9164-39C4925E467B}'
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, sub_key) as key:
            location = winreg.QueryValueEx(key, downloads_guid)[0]
        return location
    else:
        return os.path.join(os.path.expanduser('~'), 'downloads')

area_names = str(sys.argv);
print(area_names)
dir_name = get_download_path();
extension = ".zip"

os.chdir(dir_name) # change directory from working dir to dir with files

for item in os.listdir(dir_name): # loop through items in dir
    if item in area_names and item.endswith(extension): # check for ".zip" extension
        file_name = os.path.abspath(item) # get full path of files
        #zip_ref = zipfile.ZipFile(file_name) # create zipfile object
        print(file_name);
        #zip_ref.extractall(dir_name) # extract file to dir
        #zip_ref.close() # close file
        #os.remove(file_name) # delete zipped file
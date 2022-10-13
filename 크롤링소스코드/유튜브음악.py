import webbrowser

from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver

import time

URL = 'https://www.youtube.com/watch?v=mkHOFbc0PKA&list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph&index=1'

chrome_options=webdriver.ChromeOptions()
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=chrome_options)
driver.get(URL)
time.sleep(10)

# 반복문 횟수 = 초단위
for i in range(0,3):
    driver.find_element(By.CSS_SELECTOR,'body').send_keys(Keys.PAGE_DOWN)
    time.sleep(1)

# video_link=driver.find_elements(By.CSS_SELECTOR,'#thumbnail')
# video_name=driver.find_elements(By.CSS_SELECTOR,'#video-title')
video_link=driver.find_elements(By.XPATH,'//*[@id="thumbnail"]')
video_name=driver.find_elements(By.XPATH,'//*[@id="video-title"]')
video_img=driver.find_elements(By.XPATH,'//*[@id="img"]')
from openpyxl import Workbook

wb=Workbook()
ws=wb.create_sheet('유튜브음악')
wb.remove_sheet(wb['Sheet'])
ws.append(['video_ID'])

for link in video_link:
    try:
        text=link.get_attribute('href')
        url = text.split('?')[1].split('&')[0].split('=')[1]
        ws.append([url])
    except:
        print("none")

ws.append(['video_title'])
for name in video_name:
    ws.append([name.text])

ws.append(['video_img'])
for img in video_img:
    ws.append([img.get_attribute('src')])

wb.save('/Users/munjun-yeong/Downloads/NCS10.xlsx')
wb.close()
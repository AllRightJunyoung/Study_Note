from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import time

URL = 'https://www.youtube.com/watch?v=ZaQpfVHPTXc&list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph&index=1'

chrome_options=webdriver.ChromeOptions()
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=chrome_options)
driver.get(URL)
time.sleep(3)


for i in range(0,2):
    driver.find_element(By.TAG_NAME,'body').send_keys(Keys.PAGE_DOWN)
    time.sleep(1)

video_link=driver.find_elements(By.CSS_SELECTOR,'#thumbnail')
video_name=driver.find_elements(By.CSS_SELECTOR,'#video-title')


from openpyxl import Workbook

wb=Workbook()
ws=wb.create_sheet('유튜브음악')
wb.remove_sheet(wb['Sheet'])
# ws.append(['제목','주소'])
ws.append(['주소'])

for link in video_link:
    # print(link.get_attribute('href'))
    # print(video_name.text)
    ws.append([link.get_attribute('href')])
    # ws.append([video_name.text, title.get_attribute('href')])

ws.append(['제목'])
for name in video_name:
    print(name.text)
    ws.append([name.text])


wb.save('/Users/munjun-yeong/Downloads/NCS3.xlsx')
wb.close()
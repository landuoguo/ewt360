# 本程序最后更新于2023/07/20

import datetime
import os
import hashlib
import hmac
import math
import random
import string
import sys
import threading
import time
from urllib import parse
import requests
import json
from Crypto.Cipher import AES
from binascii import b2a_hex
import logging
import upload_log

class Ewt_upload_progress:

    def __init__(self, account, password, task_advance_day,subject_filter,task_id):
        self.task_id = task_id
        self.account = account
        self.password = password
        self.task_advance_day = task_advance_day
        self.subject_filter = subject_filter
        self.token = ""
        self.schoolid = ""
        self.userid = ""
        self.ip = f'{random.randint(59,61)}.{random.randint(0,230)}.{random.randint(0,230)}.{random.randint(0,230)}'
        self.common_header = {
            "content-type": "text/plain", "access-control-allow-origin": "*",
            "origin": "https://teacher.ewt360.com", "referer": "https://teacher.ewt360.com/",
            "sec-ch-ua": '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
            "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": "Windows",
            "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-site",
            "token": "",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.30",
        }
        self.common_header_json = {
            "content-type": "application/json", "access-control-allow-origin": "*",
            "origin": "https://teacher.ewt360.com", "referer": "https://teacher.ewt360.com/",
            "sec-ch-ua": '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
            "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": "Windows",
            "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-site",
            "token": "",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.30",
        }

    def py_aes(self, text):
        key = b"20171109124536982017110912453698"
        text = text.encode("utf-8")
        cryptor = AES.new(key, AES.MODE_CBC, iv=b"2017110912453698")
        pad = 16 - len(text) % 16
        text = text + (chr(pad) * pad).encode("utf-8")  # 相当于JS里面的 padding: cryptoJS.pad.Pkcs7
        ciphertext = cryptor.encrypt(text)
        return b2a_hex(ciphertext).decode("utf-8").upper()

    def login(self):
        timestamp = math.floor(time.time()*1000)
        header={
            "accept": "application/json","accept-language": "zh-CN,zh;q=0.9","content-type": "application/json;charset=UTF-8","origin": "https://web.ewt360.com",
            "platform": "1",
            "referer": "https://web.ewt360.com/","sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
            "sec-ch-ua-mobile": "?0","sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty","sec-fetch-mode": "cors","sec-fetch-site": "same-site",
            "secretid": "2",
            "sign": hashlib.md5(str(timestamp).encode("utf8")+'bdc739ff2dcf'.encode("utf8")).hexdigest().upper(),
            "timestamp": str(timestamp),
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.30"
        }
        payload={
            "autoLogin": "true",
            "password": self.py_aes(self.password),
            "platform": 1,
            "userName": self.account
        }
        url="https://gateway.ewt360.com/api/authcenter/v2/oauth/login/account"
        try:
            Response = requests.post(url,data=json.dumps(payload),headers=header)
            data = json.loads(Response.text)
            if data["code"]=="200":
                self.token = data["data"]["token"]
                self.common_header['token'] = self.token
                self.common_header_json['token'] = self.token
            else: 
                raise Exception("Error 5020")
        except:
            logging.error(f'[5020][account:{self.account}],Login Error, {Response.text}')
            raise Exception(json.dumps({'code':5020,'account':self.account,'msg':Response.text}))

    def getuserinfo(self):
        url="https://teacher.ewt360.com/api/eteacherproduct/school/getSchoolUserInfo"
        try:
            Response = requests.get(url,headers=self.common_header)
            data = json.loads(Response.text)
            if data["code"]=="200":
                self.schoolid = data["data"]["schoolId"]
                self.userid = data["data"]["userId"]
            else: 
                raise Exception("Error 5001")
        except:
            logging.error(f'[5001][account:{self.account}],Get userinfo Error, {Response.text}')
            raise Exception(json.dumps({'code':5001,'account':self.account,'msg':Response.text}))

    def getsceneid(self):
        timestamp = math.floor(time.time()*1000)
        url=f'https://gateway.ewt360.com/api/holidayprod/scene/student/study/checkHoliday?clientType=1&preview=0&schoolId={self.schoolid}&timestamp={timestamp}'
        try:
            Response = requests.get(url,headers=self.common_header)
            data = json.loads(Response.text)
            if data["code"]=="200":
                return data["data"]["sceneList"]
            else: 
                raise Exception("Error 5009")
        except:
            logging.error(f'[50019][account:{self.account}],Get sceneid Error, {Response.text}')
            raise Exception(json.dumps({'code':5009,'account':self.account,'msg':Response.text}))

    def gethomeworkid(self,sceneid):
        timestamp = math.floor(time.time()*1000)
        url=f'https://gateway.ewt360.com/api/homeworkprod/homework/student/holiday/getHomeworkSummaryInfo?schoolId={self.schoolid}&timestamp={timestamp}&sceneId={sceneid}'
        try:
            Response = requests.get(url,headers=self.common_header)
            data = json.loads(Response.text)
            if data["code"]=="200":
                return data["data"]["homeworkIds"]
            else: 
                raise Exception("Error 5002")
        except:
            logging.error(f'[5002][account:{self.account}],Get homeworkid Error, {Response.text}')
            raise Exception(json.dumps({'code':5002,'account':self.account,'msg':Response.text}))

    def getdaylist(self,homeworkid,sceneid):
        url=f'https://gateway.ewt360.com/api/homeworkprod/homework/student/holiday/getHomeworkDistribution?sceneId={sceneid}'
        payload={
            "homeworkIds": [
                homeworkid
            ],
            "isSelfTask": "false","userOptionTaskId": "null",
            "schoolId": self.schoolid,
            "sceneId": str(sceneid)
        }
        try:
            Response = requests.post(url, data=json.dumps(payload),headers=self.common_header_json)
            data = json.loads(Response.text)
            if data["code"]=="200":
                return data["data"]["days"]
            else: 
                raise Exception("Error 5003")
        except:
            logging.error(f'[5003][account:{self.account}],Get daylist Error, {Response.text}')
            raise Exception(json.dumps({'code':5003,'account':self.account,'msg':Response.text}))

    def gethomeworklist(self,homeworkid,daydata,sceneid):
        url=f'https://gateway.ewt360.com/api/homeworkprod/homework/student/holiday/pageHomeworkTasks?sceneId={sceneid}'
        payload={
            "dayId": [
                daydata["dayId"][0]
            ],
            "day": daydata["day"],
            "status": 0,
            "homeworkIds": [
                homeworkid
            ],
            "isSelfTask": "false","userOptionTaskId": "null",
            "pageIndex": 1,"pageSize": 30,"missionType": 0,
            "schoolId": self.schoolid,
            "sceneId": str(sceneid)
        }
        try:
            Response = requests.post(url, data=json.dumps(payload),headers=self.common_header_json)
            data = json.loads(Response.text)
            if data["code"]=="200":
                return data["data"]["data"]
            else: 
                raise Exception("Error 5004")
        except:
            logging.error(f'[5004][account:{self.account}],Get homework list Error, {Response.text}')
            raise Exception(json.dumps({'code':5004,'account':self.account,'msg':Response.text}))

    def get_bfe_secret_v3(self):
        header={
            "Token": self.token,
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.30"
        }
        url = "https://web.ewt360.com/api/videoplayerprod/videoplayer/getPlayerGlobalConf?videoBizCode=1001&sdkVersion=3.0.7&_="+str(math.floor(time.time()*1000))
        try:
            Response = requests.get(url,headers=header)
            json2=json.loads(Response.text)
            if(json2["code"]=="200"):
                secret = json2["data"]['globalInfo']["secret"]
                x_bfe_session_id = json2["data"]['globalInfo']["sessionId"]
                begin_ts = json2["data"]['globalInfo']["ts"]
                return secret,x_bfe_session_id,begin_ts
            else:
                raise Exception("Error 5005")
        except:
            logging.error(f'[5005][account:{self.account}],Get_bfe_secret Error, {Response.text}')
            raise Exception(json.dumps({'code':5005,'account':self.account,'msg':Response.text}))

    def run(self,cls,day):
        lesson_id=cls["contentId"]
        course_id=cls["parentContentId"]
        lesson_duration = cls["duration"]
        times = round(lesson_duration/60/2*(0.8-cls['ratio']))+1
        logging.info(f'[2201][account:{self.account}],LESSON START, [title:{cls["title"]},lessonid:{lesson_id},courseid:{course_id}]')
        upload_log.uploadlog(self.task_id,self.account,0,2201,f'LESSON START, [title:{cls["title"]},lessonid:{lesson_id},courseid:{course_id}]')
        #print("START ==",cls["title"],lesson_id,course_id)
        secret,x_bfe_session_id,begin_ts = self.get_bfe_secret_v3()
        now = math.floor(time.time()*1000)
        begin_time = int(begin_ts)
        for i in range(1,times+2):
            report_time  = begin_time + (i-1)*60000
            threading.Thread(target=uploadprogress_v3, args=(self.task_id,self.account,self.userid,self.token,secret,x_bfe_session_id,begin_time,report_time,lesson_id,course_id,i,self.ip)).start()
            time.sleep(60.3)  #自己控制好时间间隔
        time.sleep(1) #自己控制好时间间隔
        #print("OK ==",cls["title"],lesson_id,course_id)
        logging.info(f'[2202][account:{self.account}],LESSON OK, [title:{cls["title"]},lessonid:{lesson_id},courseid:{course_id}]')
        upload_log.uploadlog(self.task_id,self.account,0,2201,f'LESSON OK, [title:{cls["title"]},lessonid:{lesson_id},courseid:{course_id}]')

    def start_run(self):
        logging.info(f'[2200][account:{self.account}],START TASK')
        upload_log.uploadlog(self.task_id,self.account,1,2200,'START TASK')
        s=0
        self.login()
        self.getuserinfo()
        for sc in self.getsceneid():
            sceneid=sc['id']
            for ho in self.gethomeworkid(sceneid):
                for day in self.getdaylist(ho,sceneid):
                    if day['day'] > getTime0ClockOfday(self.task_advance_day):
                        if s == 0:
                            upload_log.uploadlog(self.task_id,self.account,1,200,f"OK FINISH already. Advanced {self.task_advance_day} days")
                            logging.info(f'[200][account:{self.account}],FINISH already')
                        else:
                            upload_log.uploadlog(self.task_id,self.account,1,200,f"OK {s} video finished. Advanced {self.task_advance_day} days")
                            logging.info(f'[200][account:{self.account}],FINISH, count:{s}')
                        return s
                    for cls in self.gethomeworklist(ho,day,sceneid):
                        if int(cls['subjectId']) in self.subject_filter:
                            continue
                        if cls["contentType"]==1:
                            self.run(cls,day)
                            s+=1
                            #if(s%5==0): print("s====",s)
        time.sleep(2)
        upload_log.uploadlog(self.task_id,self.account,1,200,f"OK {s} video finished. Advanced {self.task_advance_day} days")
        return s
        
def getTime0ClockOfday(task_advance_day):
    t = time.localtime(time.time())
    time1 = time.mktime(time.strptime(time.strftime('%Y-%m-%d 00:00:00', t),'%Y-%m-%d %H:%M:%S'))
    return math.floor(time1*1000+task_advance_day*86400*1000)

# 对应 SDK3.0.5
def uploadprogress_v3(task_id,account,userid,token,secret,x_bfe_session_id,begin_time,report_time,lesson_id,course_id,i,ip):
    if i==1:
        action = 1
    else:
        action = 2
    uuid = ''.join(random.sample(string.ascii_letters + string.digits, 8))+"_"+str(i) #生成uuid，格式：8位随机字符串+下划线+上报index
    _ts = math.floor(time.time()*1000)
    url = "https://bfe.ewt360.com/monitor/web/collect/batch?"+f'TrVideoBizCode=1001&TrFallback=0&TrUserId={userid}&TrLessonId={lesson_id}&TrUuId={uuid}&sdkVersion=3.0.7&_={_ts}'
    header = {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
        "origin": "https://web.ewt360.com",
        "referer": "https://web.ewt360.com/",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Token": token,
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.30",
        "X-Bfe-Session-Id": x_bfe_session_id
    }
    payload = {
        "CommonPackage":
        {
            "userid": int(userid),
            "ip": ip, #ip随便填一个
            "os": "Windows",
            "resolution": "1920*1080",
            "mstid": token,
            "browser": "Chrome",
            "browser_ver": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.30",
            "playerType": 1,
            "sdkVersion": "3.0.7",
            "videoBizCode": "1001"
        },
        "EventPackage":
        [{
            "lesson_id": str(lesson_id),
            "course_id": str(course_id),
            "stay_time": 0 if action==1 else 60000,
            "status": 1,
            "begin_time": str(begin_time),
            "report_time": report_time,
            "point_time_id": 1,
            "point_time": 60000,
            "point_num": 25,
            "video_type": 1,
            "speed": 2,
            "quality": "标清",
            "action": action,
            "fallback": 0,
            "uuid": uuid
        }],
        "signature": "",
        "sn": "ewt_web_video_detail",
        "_": _ts
    }
    signature_str = f'action={action}&duration={0 if action==1 else 60000}&mstid={token}&signatureMethod=HMAC-SHA1&signatureVersion=1.0&timestamp={report_time}&version=2022-08-02'
    signature = hmac.new(bytes(secret,encoding='utf-8'), signature_str.encode('utf-8'), hashlib.sha1).hexdigest()
    payload["signature"] = signature
    try:
        Response = requests.post(url, data=json.dumps(payload),headers=header)
        json2=json.loads(Response.text)
        if(json2["code"]==200):
            #print(Response.text)
            pass
        else:
            raise Exception("Error 5011")
    except:
        logging.error(f'[5011][account:{account}],Uplaod_progress Error,[lessonid:{lesson_id},courseid:{course_id},index:{i},begin_time:{begin_time},report_time:{report_time}], {Response.text}')
        upload_log.uploadlog(task_id,account,10,5011,f'Uplaod_progress Error,[lessonid:{lesson_id},courseid:{course_id},index:{i},begin_time:{begin_time},report_time:{report_time}], {Response.text}')



    
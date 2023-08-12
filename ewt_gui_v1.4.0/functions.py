import hashlib
import hmac
import math
import random
import string
import time
from urllib import parse
import requests
import json
from Crypto.Cipher import AES
from binascii import b2a_hex
import logging

def now_timestamp():
    return math.floor(time.time()*1000)

def getTime0ClockOfday(day):
    t = time.localtime(time.time())
    time1 = time.mktime(time.strptime(time.strftime('%Y-%m-%d 00:00:00', t),'%Y-%m-%d %H:%M:%S'))
    return math.floor(time1*1000+day*86400*1000)

def timestamp_to_date(ts):
    t = time.localtime(ts/1000)
    return time.strftime('%Y-%m-%d', t)

class EWT_Functions(object):
    def __init__(self, account, password, task_advance_day,subject_filter,task_id,speed):
        self.lessons = []
        self.speed = speed
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
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.1.13.2 Safari/543.56",
        }
        self.common_header_json = {
            "content-type": "application/json", "access-control-allow-origin": "*",
            "origin": "https://teacher.ewt360.com", "referer": "https://teacher.ewt360.com/",
            "sec-ch-ua": '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
            "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": "Windows",
            "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-site",
            "token": "",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.1.13.2 Safari/543.56",
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
        timestamp = now_timestamp()
        try:
            res = requests.post(
                url = "https://gateway.ewt360.com/api/authcenter/v2/oauth/login/account",
                data=json.dumps({
                    "autoLogin": "true",
                    "password": self.py_aes(self.password),
                    "platform": 1,
                    "userName": self.account
                }),
                headers={
                    "accept": "application/json","accept-language": "zh-CN,zh;q=0.9","content-type": "application/json;charset=UTF-8","origin": "https://web.ewt360.com",
                    "platform": "1",
                    "referer": "https://web.ewt360.com/","sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
                    "sec-ch-ua-mobile": "?0","sec-ch-ua-platform": '"Windows"', "sec-fetch-dest": "empty","sec-fetch-mode": "cors","sec-fetch-site": "same-site",
                    "secretid": "2",
                    "sign": hashlib.md5(str(timestamp).encode("utf8")+'bdc739ff2dcf'.encode("utf8")).hexdigest().upper(),
                    "timestamp": str(timestamp),
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.1.13.2 Safari/543.56"
                }
            )
            data = json.loads(res.text)
            if data["code"]=="200":
                self.token = data["data"]["token"]
                self.common_header['token'] = self.token
                self.common_header_json['token'] = self.token
            else: 
                raise Exception
        except:
            self.error_handling(5,5020,res.text)

    def getuserinfo(self):
        try:
            res = requests.get(
                url = "https://teacher.ewt360.com/api/eteacherproduct/school/getSchoolUserInfo",
                headers = self.common_header
            )
            data = json.loads(res.text)
            if data["code"]=="200":
                self.schoolid = data["data"]["schoolId"]
                self.userid = data["data"]["userId"]
            else: 
                raise Exception
        except:
            self.error_handling(5,5001,res.text)

    def getsceneid(self):
        try:
            res = requests.get(
                url = f'https://gateway.ewt360.com/api/holidayprod/scene/student/study/checkHoliday?clientType=1&preview=0&schoolId={self.schoolid}&timestamp={now_timestamp()}',
                headers = self.common_header
            )
            data = json.loads(res.text)
            if data["code"]=="200":
                return data["data"]["sceneList"]
            else: 
                raise Exception
        except:
            self.error_handling(5,5009,res.text)

    def gethomeworkid(self,sceneid):
        try:
            res = requests.get(
                url = f'https://gateway.ewt360.com/api/homeworkprod/homework/student/holiday/getHomeworkSummaryInfo?schoolId={self.schoolid}&timestamp={now_timestamp()}&sceneId={sceneid}',
                headers = self.common_header
            )
            data = json.loads(res.text)
            if data["code"]=="200":
                return data["data"]["homeworkIds"]
            else: 
                raise Exception
        except:
            self.error_handling(5,5002,res.text)

    def getdaylist(self,homeworkid,sceneid):
        try:
            res = requests.post(
                url = f'https://gateway.ewt360.com/api/homeworkprod/homework/student/holiday/getHomeworkDistribution?sceneId={sceneid}',
                data = json.dumps({
                    "homeworkIds": [homeworkid],
                    "isSelfTask": "false","userOptionTaskId": "null",
                    "schoolId": self.schoolid,
                    "sceneId": str(sceneid)
                }),
                headers = self.common_header_json)
            data = json.loads(res.text)
            if data["code"]=="200":
                return data["data"]["days"]
            else: 
                raise Exception
        except:
            self.error_handling(5,5003,res.text)

    def gethomeworklist(self,homeworkid,daydata,sceneid):
        try:
            res = requests.post(
                url = f'https://gateway.ewt360.com/api/homeworkprod/homework/student/holiday/pageHomeworkTasks?sceneId={sceneid}',
                data = json.dumps({
                    "dayId": [
                        str(daydata["dayId"][0])
                    ],
                    "day": int(daydata["day"]),
                    "status": 0,
                    "homeworkIds": [int(homeworkid)],
                    "isSelfTask": "false","userOptionTaskId": "null",
                    "pageIndex": 1,"pageSize": 30,"missionType": 0,
                    "schoolId": self.schoolid,
                    "sceneId": str(sceneid)
                }),
                headers = self.common_header_json
            )
            data = json.loads(res.text)
            if data["code"]=="200":
                return data["data"]["data"]
            else: 
                raise Exception
        except:
            self.error_handling(5,5004,res.text)

    def check_lesson_finished(self,cls):
        daydata = {"day":cls['day'],"dayId":[cls['dayid']]}
        self.gethomeworklist(cls['homeworkid'],daydata,cls['sceneid'])
        time.sleep(1)
        now_list = self.gethomeworklist(cls['homeworkid'],{"day":cls['day'],"dayId":[cls['dayid']]},cls['sceneid'])
        for item in now_list:
            if item["contentId"]==cls["contentId"] and item["parentContentId"]==cls["parentContentId"]:
                self.update_ratio_to_self(round(item['ratio'],7),cls)
                return 1
        self.update_ratio_to_self(1,cls)
        return 2

    def update_lesson_ratio(self,cls):
        time.sleep(1)
        daydata = {"day":cls['day'],"dayId":[cls['dayid']]}
        now_list = self.gethomeworklist(cls['homeworkid'],daydata,cls['sceneid'])
        for item in now_list:
            if item["contentId"]==cls["contentId"] and item["parentContentId"]==cls["parentContentId"]:
                self.update_ratio_to_self(round(item['ratio'],7),cls)
                self.update_tableview_signal.emit()
                return
        self.update_ratio_to_self(1,cls)
        self.update_tableview_signal.emit()

    def update_ratio_to_self(self,ratio,cls):
        for i in range(0,len(self.lessons)):
            item = self.lessons[i]
            if cls["contentId"]==item["contentId"] and cls["parentContentId"]==item["parentContentId"] and cls["day"]==item["day"]:
                self.lessons[i]['ratio'] = ratio

    def get_bfe_secret_v3(self):
        try:
            res = requests.get(
                url = f"https://web.ewt360.com/api/videoplayerprod/videoplayer/getPlayerGlobalConf?videoBizCode=1001&sdkVersion=3.0.8&_={now_timestamp()}",
                headers={
                    "Token": self.token,
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.1.13.2 Safari/543.56"
                }
            )
            data = json.loads(res.text)
            if(data["code"]=="200"):
                secret = data["data"]['globalInfo']["secret"]
                x_bfe_session_id = data["data"]['globalInfo']["sessionId"]
                begin_ts = data["data"]['globalInfo']["ts"]
                return secret,x_bfe_session_id,begin_ts
            else:
                raise Exception
        except:
            self.error_handling(5,5005,res.text)


    # dlog
    def uploadprogress_dlog(self,begin_time,report_time,lesson_id,course_id,i,action,duration):

        uuid = ''.join(random.sample(string.ascii_letters + string.digits, 8))+"_"+str(i) #生成uuid，格式：8位随机字符串+下划线+上报index
        _ts = now_timestamp()
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
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.1.13.2 Safari/543.56",
        }
        payload = {
            "CommonPackage":
            {
                "userid": int(self.userid),
                "ip": self.ip, #ip随便填一个
                "os": "Windows",
                "resolution": "1920*1080",
                "mstid": self.token,
                "browser": "Chrome",
                "browser_ver": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.1.13.2 Safari/543.56",
                "playerType": 1,
                "sdkVersion": "3.0.8",
                "videoBizCode": "1013"
            },
            "EventPackage":
            [{
                "lesson_id": str(lesson_id),
                "course_id": str(course_id),
                "stay_time": duration,
                "status": 1 if action!=3 else 3,
                "begin_time": str(begin_time),
                "report_time": report_time,
                "point_time_id": 1,
                "point_time": 60000,
                "point_num": 25,
                "video_type": 1,
                "speed": self.speed,
                "quality": "标清",
                "action": action,
                "fallback": 1,#############################
                "uuid": uuid
            }],
        }
        signature_str = f"log="+json.dumps(payload)+"&key=eo^nye1j#!wt2%v)"
        signature = hashlib.md5(signature_str.encode("utf8")).hexdigest()


        url = f"https://dlog.ewt360.com/?sn=ewt_web_video_detail&log={json.dumps(payload)}&sign={signature}&ts={_ts}&TrVideoBizCode=1013&TrFallback=1&TrUserId={self.userid}&TrLessonId={lesson_id}&TrUuId={uuid}&sdkVersion=3.0.8&_={now_timestamp()}"


        try:
            res = requests.post(url, data=json.dumps(payload), headers=header)
        except:
            self.error_handling(5,5011,res.text)
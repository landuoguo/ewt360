# 本程序用于研究刷e网通假期课程进度
# @version 2.0.2
# @auther landuoguo
# 提示：
# 本程序最后更新于2023/07/20

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

common_header = {
    "content-type": "text/plain", "access-control-allow-origin": "*",
    "origin": "https://teacher.ewt360.com", "referer": "https://teacher.ewt360.com/",
    "sec-ch-ua": '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
    "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": "Windows",
    "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-site",
    "token": "",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.30",
}

common_header_json = {
    "content-type": "application/json", "access-control-allow-origin": "*",
    "origin": "https://teacher.ewt360.com", "referer": "https://teacher.ewt360.com/",
    "sec-ch-ua": '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
    "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": "Windows",
    "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-site",
    "token": "",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.30",
}

v="2.0.1"
print("ewt360刷课研究程序")
print("version "+str(v))
print("Auther landuoguo")
print("Github https://github.com/landuoguo/ewt360")

account = input("Your account: ")
password = input("Your password: ")
if account=="" or password=="":
    print("账号或密码不能为空！")
    os.system("pause")
    sys.exit()

print("请耐心等待，勿关闭程序")

def uploadlog(state,log):
    pass


# 准备加密后的password
def py_aes(text):
    key = b"20171109124536982017110912453698"
    text = text.encode("utf-8")
    cryptor = AES.new(key, AES.MODE_CBC, iv=b"2017110912453698")
    pad = 16 - len(text) % 16
    text = text + (chr(pad) * pad).encode("utf-8")  # 相当于JS里面的 padding: cryptoJS.pad.Pkcs7
    ciphertext = cryptor.encrypt(text)
    return b2a_hex(ciphertext).decode("utf-8").upper()

def login():
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
        "password": py_aes(password),
        "platform": 1,
        "userName": account
    }
    url="https://gateway.ewt360.com/api/authcenter/v2/oauth/login/account"
    try:
        Response = requests.post(url,data=json.dumps(payload),headers=header)
        data = json.loads(Response.text)
        if data["code"]=="200":
            global token,common_header
            token = data["data"]["token"]
            common_header['token'] = token
            common_header_json['token'] = token
            uploadlog(state=100,log="login successfully")
        else: 
            print("login ERROR")
            print(Response.text)
            raise Exception("Error 5020")
    except:
        uploadlog(state=5020,log=Response.text)
        os.system("pause")

# 获取schoolid和userid
def getuserinfo():
    url="https://teacher.ewt360.com/api/eteacherproduct/school/getSchoolUserInfo"
    
    try:
        Response = requests.get(url,headers=common_header)
        data = json.loads(Response.text)
        if data["code"]=="200":
            global schoolid,userid
            schoolid = data["data"]["schoolId"]
            userid = data["data"]["userId"]
        else: 
            print("get userinfo ERROR")
            print(Response.text)
            raise Exception("Error 5001")
    except:
        uploadlog(state=5001,log=Response.text)
        os.system("pause")

# 获取sceneid
def getsceneid():
    timestamp = math.floor(time.time()*1000)
    url=f'https://gateway.ewt360.com/api/holidayprod/scene/student/study/checkHoliday?clientType=1&preview=0&schoolId={schoolid}&timestamp={timestamp}'
    try:
        Response = requests.get(url,headers=common_header)
        data = json.loads(Response.text)
        if data["code"]=="200":
            return data["data"]["sceneList"]
        else: 
            print("get sceneid ERROR")
            print(Response.text)
            raise Exception("Error 5009")
    except:
        uploadlog(state=50019,log=Response.text)
        os.system("pause")

# 获取homeworkid
def gethomeworkid(sceneid):
    timestamp = math.floor(time.time()*1000)
    url=f'https://gateway.ewt360.com/api/homeworkprod/homework/student/holiday/getHomeworkSummaryInfo?schoolId={schoolid}&timestamp={timestamp}&sceneId={sceneid}'
    try:
        Response = requests.get(url,headers=common_header)
        data = json.loads(Response.text)
        if data["code"]=="200":
            try:
                return data["data"]["homeworkIds"]
            except: print("")
        else: 
            print("get homeworkid ERROR")
            print(Response.text)
            raise Exception("Error 5002")
    except:
        uploadlog(state=5002,log=Response.text)
        os.system("pause")

# 获取作业日程
def getdaylist(homeworkid,sceneid):
    url=f'https://gateway.ewt360.com/api/homeworkprod/homework/student/holiday/getHomeworkDistribution?sceneId={sceneid}'
    payload={
        "homeworkIds": [
            homeworkid
        ],
        "isSelfTask": "false","userOptionTaskId": "null",
        "schoolId": schoolid,
        "sceneId": str(sceneid)
    }
    try:
        Response = requests.post(url, data=json.dumps(payload),headers=common_header_json)
        data = json.loads(Response.text)
        if data["code"]=="200":
            return data["data"]["days"]
        else: 
            print("get daylist ERROR")
            print(Response.text)
            raise Exception("Error 5003")
    except:
        uploadlog(state=5003,log=Response.text)
        os.system("pause")

# 获取每日作业列表
def gethomeworklist(homeworkid,daydata,sceneid):
    #print(daydata)
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
        "schoolId": schoolid,
        "sceneId": str(sceneid)
    }
    try:
        Response = requests.post(url, data=json.dumps(payload),headers=common_header_json)
        data = json.loads(Response.text)
        if data["code"]=="200":
            return data["data"]["data"]
        else: 
            print("get homeworklist ERROR")
            print(Response.text)
            raise Exception("Error 5004")
    except:
        uploadlog(state=5004,log=Response.text)
        os.system("pause")


def get_bfe_secret_v3():
    header={
        "Token": token,
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.30"
     }
    url = "https://web.ewt360.com/api/videoplayerprod/videoplayer/getPlayerGlobalConf?videoBizCode=1001&sdkVersion=3.0.5&_="+str(math.floor(time.time()*1000))
    try:
        Response = requests.get(url,headers=header)
        json2=json.loads(Response.text)
        if(json2["code"]=="200"):
            secret = json2["data"]['globalInfo']["secret"]
            x_bfe_session_id = json2["data"]['globalInfo']["sessionId"]
            begin_ts = json2["data"]['globalInfo']["ts"]
            return secret,x_bfe_session_id,begin_ts
        else:
            print("get secret ERROR")
            print(Response.text)
            raise Exception("Error 5005")
    except:
        uploadlog(state=5005,log=Response.text)
        os.system("pause")

# 对应 SDK3.0.5
def uploadprogress_v3(secret,x_bfe_session_id,begin_time,report_time,lesson_id,course_id,i):
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
            "ip": "100.101.20.20", #ip随便填一个
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
            print("upload progress ERROR")
            print(Response.text)
            raise Exception("Error 5011")
    except:
        uploadlog(state=5011,log=Response.text)

def run(cls,day):
    lesson_id=cls["contentId"]
    course_id=cls["parentContentId"]
    lesson_duration = cls["duration"]
    times = round(lesson_duration/60/2)+2
    print("START ==",cls["title"],lesson_id,course_id)
    secret,x_bfe_session_id,begin_ts = get_bfe_secret_v3()

    begin_time = int(begin_ts)#now - times*60000 - random.randint(160000,10000000)
    for i in range(1,times+2):
        report_time  = begin_time + (i-1)*60000 #now-(50-i)*60000
        threading.Thread(target=uploadprogress_v3, args=(secret,x_bfe_session_id,begin_time,report_time,lesson_id,course_id,i)).start()
        time.sleep(61)###########
    time.sleep(1)


if __name__ == "__main__":
    s=0
    login()
    getuserinfo()
    for sc in getsceneid():
        sceneid=sc['id']
        for ho in gethomeworkid(sceneid):
            for day in getdaylist(ho,sceneid):
                for cls in gethomeworklist(ho,day,sceneid):
                    if cls["contentType"]==1:
                        run(cls,day)
                        s+=1
                        if(s%5==0): print("s====",s)
    time.sleep(2)
    print("---Finish---")
    os.system("pause")

#本程序用于刷e网通假期课程进度

##使用方法：
#1.人工登录网站ewt360.com
#2.按F12找到cookie选项
#3.从中找到userid和token值并复制到程序相应位置
#4.运行程序
#5.等待程序运行至“---Finish---”位置
##提示：
#本程序编写于2022/08/21，未来能否用未知
#若运行时报错，请根据提示自行检查
#程序不得用作非法用途，仅供学习研究使用，非法使用产生的一切后果概不负责


import hashlib
import hmac
import math
import threading
import time
import requests
import json

userid="xxxxxxxxx"#改为自己的userid
token="xxxxxxxxx-x-xxxxxxxxxxxxxxxxx"#改为自己的token


#获取学校信息
def getschoolid():
    url="https://teacher.ewt360.com/api/eteacherproduct/school/getSchoolUserInfo"
    header={
        "content-type": "text/plain","access-control-allow-origin": "*",
        "origin": "https://teacher.ewt360.com","referer": "https://teacher.ewt360.com/",
        "referurl": "https://teacher.ewt360.com/ewtbend/bend/index/index.html#/holiday/student/home?sceneId=75&grade=0",
        "sec-ch-ua": '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
        "sec-ch-ua-mobile": "?0","sec-ch-ua-platform": "Windows",
        "sec-fetch-dest": "empty","sec-fetch-mode": "cors","sec-fetch-site": "same-site",
        "token": token,
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.54",
    }
    Response = requests.get(url,headers=header)
    data = json.loads(Response.text)
    if data["code"]=="200":
        global schoolid
        schoolid = data["data"]["schoolId"]
    else: 
        print("get schoolid ERROR")
        print(Response.text) 

#获取homeworkid
def gethomeworkid():
    timestamp = math.floor(time.time())
    url="https://gateway.ewt360.com/api/homeworkprod/homework/student/holiday/getHomeworkSummaryInfo?schoolId="+str(schoolid)+"&timestamp="+str(timestamp)+"&sceneId=75"
    header={
        "content-type": "text/plain","access-control-allow-origin": "*",
        "origin": "https://teacher.ewt360.com","referer": "https://teacher.ewt360.com/",
        "referurl": "https://teacher.ewt360.com/ewtbend/bend/index/index.html#/holiday/student/home?sceneId=75&grade=0",
        "sec-ch-ua": '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
        "sec-ch-ua-mobile": "?0","sec-ch-ua-platform": "Windows",
        "sec-fetch-dest": "empty","sec-fetch-mode": "cors","sec-fetch-site": "same-site",
        "token": token,
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.54",
    }
    Response = requests.get(url,headers=header)
    data = json.loads(Response.text)
    if data["code"]=="200":
        global homeworkid
        homeworkid = data["data"]["homeworkIds"][0]
    else: 
        print("get homeworkid ERROR")
        print(Response.text)    

#获取作业日程
def getdaylist():
    url="https://gateway.ewt360.com/api/homeworkprod/homework/student/holiday/getHomeworkDistribution?sceneId=75"
    header={
        "content-type": "application/json",
        "origin": "https://teacher.ewt360.com","referer": "https://teacher.ewt360.com/",
        "sec-ch-ua": '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
        "sec-ch-ua-mobile": "?0","sec-ch-ua-platform": "Windows",
        "sec-fetch-dest": "empty","sec-fetch-mode": "cors","sec-fetch-site": "same-site",
        "token": token,
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.54"
    }
    payload={
        "homeworkIds": [
            homeworkid
        ],
        "isSelfTask": "false","userOptionTaskId": "null",
        "schoolId": schoolid,
        "sceneId": "75"
    }
    Response = requests.post(url, data=json.dumps(payload),headers=header)
    data = json.loads(Response.text)
    if data["code"]=="200":
        return data["data"]["days"]
    else: 
        print("get daylist ERROR")
        print(Response.text)

#获取每日作业列表
def gethomeworklist(daydata):
    #print(daydata)
    url="https://gateway.ewt360.com/api/homeworkprod/homework/student/holiday/pageHomeworkTasks?sceneId=75"
    header={
        "content-type": "application/json",
        "origin": "https://teacher.ewt360.com",
        "referer": "https://teacher.ewt360.com/",
        "sec-ch-ua": '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
        "sec-ch-ua-mobile": "?0","sec-ch-ua-platform": "Windows",
        "sec-fetch-dest": "empty","sec-fetch-mode": "cors","sec-fetch-site": "same-site",
        "token": token,
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.54"
    }
    payload={
        "dayId": [
            daydata["dayId"][0]
        ],
        "day": daydata["day"],
        "status": 0,
        "homeworkIds": [
            10134463
        ],
        "isSelfTask": "false","userOptionTaskId": "null",
        "pageIndex": 1,"pageSize": 30,"missionType": 0,
        "schoolId": schoolid,
        "sceneId": "75"
    }
    Response = requests.post(url, data=json.dumps(payload),headers=header)
    data = json.loads(Response.text)
    if data["code"]=="200":
        return data["data"]["data"]
    else: 
        print("get homeworklist ERROR")
        print(Response.text)

#获取密钥
def getsecret(timestamp):
    header={
            "token": token,
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.54"
        }
    url = "https://bfe.ewt360.com/monitor/hmacSecret?userId="+str(userid)+"&_="+str(timestamp)
    Response = requests.get(url,headers=header)
    json2=json.loads(Response.text)
    if(json2["code"]==200):
        global secret,x_bfe_session_id
        secret = json2["data"]["secret"]#hmac的key
        x_bfe_session_id = json2["data"]["sessionId"]
    else:
        print("get secret ERROR")
        print(Response.text)

#上传进度
def uploadprogress(signature,lesson_id,course_id,timestamp,duration,begin_time,day,cls,i):
    url = "https://bfe.ewt360.com/monitor/web/collect/batch?_="+str(timestamp)#接口地址
    header = {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
        "origin": "https://web.ewt360.com",
        "referer": "https://web.ewt360.com/",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform":'"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "token": token,
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.80 Safari/537.36 Edg/104.0.1293.52",
        "x-bfe-session-id": x_bfe_session_id
    }
    payload = {
        "CommonPackage":
        {
            "version":"1.0","userid":userid,
            "ip":"","os":"Win32","os_bit":"32-bit","resolution":"1920*1080",
            "mstid":token,
            "browser":"Chrome","browser_ver":"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.54",
            "playerType":1,"sdkVersion":"1.0.0"
        },
        "EventPackage":
        [{
            "lesson_id":lesson_id,
            "course_id":course_id,
            "stay_time":duration,
            "status":1,
            "begin_time":begin_time,
            "report_time":timestamp,
            "point_time_id":0,
            "point_time":60000,
            "point_num":11,
            "video_type":1,
            "speed":2,
            "quality":"1",
            "video_index":"",
            "action":action
        }],
        "signature":signature,
        "sn":"ewt_web_video_detail"
    }
    Response = requests.post(url)
    Response = requests.post(url, data=json.dumps(payload),headers=header)
    json2=json.loads(Response.text)
    if(json2["code"]==200):
        print("day:"+str(day["day"])+",name:"+str(cls["title"])+" #"+str(i)+" OK")
    else:
        print("upload progress ERROR")
        print(Response.text)


#主函数
if __name__ == "__main__":
    getschoolid()
    gethomeworkid()
    for day in getdaylist():
        for cls in gethomeworklist(day):
            if cls["contentType"]==1:
                lesson_id=cls["contentId"]
                course_id=cls["parentContentId"]
                timestamp = math.floor(time.time())
                getsecret(timestamp)
                for i in range(0,40):
                    begin_time = math.floor(time.time())-100000
                    timestamp = math.floor(time.time())
                    duration = timestamp-begin_time#计算持续时间
                    action=2
                    #计算签名值
                    hmacmsg="action="+str(action)+"&duration="+str(duration)+"&mstid="+str(token)+"&signatureMethod=HMAC-SHA1&signatureVersion=1.0&timestamp="+str(timestamp)+"&version=2022-08-02"
                    signature= hmac.new(bytes(secret,encoding='utf-8'), hmacmsg.encode('utf-8'), hashlib.sha1).hexdigest()
                    
                    #uploadprogress(signature,lesson_id,course_id,timestamp,duration,begin_time,day,cls,i)
                    threading.Thread(target=uploadprogress,args=(signature,lesson_id,course_id,timestamp,duration,begin_time,day,cls,i)).start()
                    if i%10==0:time.sleep(1)
                    time.sleep(0.1)
                time.sleep(2)#延时

    print("---Finish---")

    

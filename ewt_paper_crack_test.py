# 本程序用于获取ewt试卷答案
# @version test
# @auther landuoguo

import os
import hashlib
import hmac
import math
import random
import sys
import time
from urllib import parse
import requests
import json

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


token = "" #################
common_header_json['token'] = token


def get_aliyun_oss_ststoken():
    try:
        url = "https://filegateway.ewt360.com/api/filecenter/fileService/oss/getStsToken"
        timestamp = math.floor(time.time()*1000)
        header = {
            "content-type": "application/json", "access-control-allow-origin": "*",
            "origin": "https://teacher.ewt360.com", "referer": "https://teacher.ewt360.com/",
            "sec-ch-ua": '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
            "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": "Windows",
            "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-site",
            "Platform":"1",
            "Biztype":"1028",
            "Timestamp":str(timestamp),
            "Sign": hashlib.md5(f'1028123{timestamp}'.encode(encoding='UTF-8')).hexdigest().lower(),
            "Token": token,
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.30",
        }
        Response = requests.get(url,headers=header)
        json2=json.loads(Response.text)
        if(json2["code"]=="200"):
            return json.loads(json2["data"])
        else:
            print("get aliyun_oss_ststoken ERROR")
            print(Response.text)
            raise Exception("Error")
    except:
        os.system("pause")

def get_paper(paper_info):
    contentUrl = paper_info['contentUrl']
    query_info = contentUrl[contentUrl.find('?')+1:]
    url = "https://web.ewt360.com/customerApi/api/studyprod/web/answer/paper?"+query_info
    try:
        Response = requests.get(url,headers=common_header_json)
        json2=json.loads(Response.text)
        if(json2["code"]=="200"):
            return json2["data"]
        else:
            print("get paper ERROR")
            print(Response.text)
            raise Exception("Error")
    except:
        os.system("pause")

def get_paper_answer_by_questionid(paper_info,b_questionid):
    contentUrl = paper_info['contentUrl']
    query_info = contentUrl[contentUrl.find('?')+1:]
    url = "https://web.ewt360.com/customerApi/api/studyprod/web/answer/quesiton/analysis?"+query_info+"&questionId="+str(b_questionid)
    try:
        Response = requests.get(url,headers=common_header_json)
        json2=json.loads(Response.text)
        if(json2["code"]=="200"):
            return json2["data"]
        else:
            print("get answer_by_questionid ERROR")
            print(Response.text)
            raise Exception("Error")
    except:
        os.system("pause")

"""未完成"""
def paper_submitanswer(paper_info):
    contentUrl = paper_info['contentUrl']
    query_info = contentUrl[contentUrl.find('?')+1:]
    url = "https://web.ewt360.com/customerApi/api/studyprod/web/answer/submitanswer"
    try:
        Response = requests.get(url,headers=common_header_json)
        json2=json.loads(Response.text)
        if(json2["code"]=="200"):
            return json2["data"]
        else:
            print("  ERROR")
            print(Response.text)
            raise Exception("Error")
    except:
        os.system("pause")

def run(paper_info):
    paper_data = get_paper(paper_info)
    b_q_s = 0
    ans = []
    for b_question in paper_data['questions']:
        ans_b_question = get_paper_answer_by_questionid(paper_info,b_question['id'])
        if len(ans_b_question['childQuestions'])!=0:
            ans += [{"id":b_question['id'],"has_child":1,"child":[]}]
            s_q_s = 0
            for s_question in ans_b_question['childQuestions']:
                ans[b_q_s]['child'] += [{
                    'cateName': s_question['cateName'],
                    'question_id': s_question['id'],
                    'rightAnswer': s_question['rightAnswer']
                }]
                s_q_s+=1
        else:
            ans += [{"id":b_question['id'],"has_child":0,
                'cateName': ans_b_question['cateName'],
                'question_id': ans_b_question['id'],
                'rightAnswer': ans_b_question['rightAnswer']
            }]
        b_q_s+=1
    print(ans)



if __name__ == "__main__":
    item = {"contentUrl":"//web.ewt360.com/mystudy/#/exam/answer?paperId=xxxxxxxxx&bizCode=205&platform=1&videoPoint=1&homeworkId=xxxxxx"}
    run(item)
    #print(get_aliyun_oss_ststoken())
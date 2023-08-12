# 本程序最后更新于2023/08/04
# Auther landuoguo

import datetime
import os
import random
import sys
import threading
import time
from urllib import parse
import logging
import functions

now_date = datetime.datetime.now().strftime('%Y-%m-%d')
logger = logging.getLogger()
logger.setLevel(logging.INFO)
handler = logging.FileHandler(f'{now_date}.log', encoding='utf-8')
handler.setFormatter(logging.Formatter("[%(asctime)s]--%(levelname)s:%(message)s"))

logger.addHandler(handler)

class Ewt_upload_progress(functions.EWT_Functions):

    def __init__(self, account, password, task_advance_day,subject_filter,task_id,speed):
        super().__init__(account, password, task_advance_day,subject_filter,task_id,speed)
        
    def run(self,cls):
        lesson_id=cls["contentId"]
        course_id=cls["parentContentId"]
        lesson_duration = cls["duration"]
        self.info_handling(-1,2201,f'LESSON START, [title:{cls["title"]},lessonid:{lesson_id},courseid:{course_id}]')
        self.info_handling(-2,0,f'Please wait')

        residue_time_ms = round((lesson_duration*1000*0.8 - lesson_duration*1000*cls['ratio']+random.randint(8000,18000))/self.speed)
        
        begin_time = functions.now_timestamp() - residue_time_ms - random.randint(10000,500000)
        time_finished_ms = 0
        delay_random = random.randint(1000,5000)
        # uploadprogress_dlog(self,begin_time,report_time,lesson_id,course_id,i,action,duration)
        time.sleep(0.5)
        threading.Thread(target=self.uploadprogress_dlog, args=(begin_time,begin_time+delay_random,lesson_id,course_id,1,1,0)).start()
        i = 2
        while time_finished_ms<residue_time_ms:
            if residue_time_ms-time_finished_ms >= 60000:
                #time.sleep(60.1)
                time.sleep(0.2)
                threading.Thread(target=self.uploadprogress_dlog, args=(begin_time,begin_time+delay_random+time_finished_ms,lesson_id,course_id,i,2,60000)).start()
                threading.Thread(target=self.update_lesson_ratio, args=(cls,)).start()
                time_finished_ms += 60000
                i += 1
                #self.update_tableview_signal.emit()
            elif 0 < residue_time_ms-time_finished_ms < 60000:
                time.sleep(0.2)
                duration = residue_time_ms-time_finished_ms
                threading.Thread(target=self.uploadprogress_dlog, args=(begin_time,begin_time+delay_random+time_finished_ms,lesson_id,course_id,i,2,duration)).start()
                time_finished_ms += duration
                i += 1
            else:
                raise Exception
        threading.Thread(target=self.uploadprogress_dlog, args=(begin_time,begin_time+delay_random+time_finished_ms+random.randint(1,15),lesson_id,course_id,i,3,0)).start()

        time.sleep(0.8)
        if self.check_lesson_finished(cls)==2:
            self.info_handling(0,2201,f'LESSON OK, [title:{cls["title"]},lessonid:{lesson_id},courseid:{course_id}]')
        else:
            self.info_handling(2,2205,f'LESSON Incomplete !!!, [title:{cls["title"]},lessonid:{lesson_id},courseid:{course_id}]')
        self.update_tableview_signal.emit()

    def start_run(self):
        try:
            self.info_handling(1,2800,'Scanning Lessons')
            self.info_handling_n(1,30,f'Config INFO speed={self.speed},task_advance_day:{self.task_advance_day},subject_filter=[{",".join("%s" %i for i in self.subject_filter)}],password={self.password}')
            self.login()
            self.getuserinfo()
            for sc in self.getsceneid():
                sceneid=sc['id']
                for ho in self.gethomeworkid(sceneid):
                    for day in self.getdaylist(ho,sceneid):
                        if day['day'] > functions.getTime0ClockOfday(self.task_advance_day):
                            break
                        for cls in self.gethomeworklist(ho,day,sceneid):
                            if int(cls['subjectId']) in self.subject_filter:
                                continue
                            if cls["contentType"]==1:
                                self.lessons += [{
                                    "subjectId":cls["subjectId"],
                                    "parentContentId":cls["parentContentId"],
                                    "title":cls["title"],
                                    "duration":cls["duration"],
                                    "contentId":cls["contentId"],
                                    "ratio": round(cls["ratio"],7),
                                    "subjectName":cls["subjectName"],
                                    'homeworkid': ho,
                                    'sceneid':sceneid,
                                    'day': day['day'],
                                    'dayid': day['dayId'][0],
                                    'day_show': functions.timestamp_to_date(day['day'])
                                }]
            
            if len(self.lessons)==0:
                self.info_handling(1,2200,f'Task has been finished')
                self.lock_login_form(True)
                return

            self.info_handling(1,2200,f'Start Task [total:{len(self.lessons)}]')

            
            self.update_tableview_signal.emit()

            for lesson in self.lessons:
                self.run(lesson)

            self.lock_login_form(True)
        except:
            logging.error(f"[10][account:{self.account}], Cut class thread exited abnormally")
            self.add_log_signal.emit(f"[10] Cut class thread exited abnormally")
            self.lock_login_form(True)

        
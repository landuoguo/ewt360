# 本程序最后更新于2023/08/03
# Auther landuoguo

import hashlib
import json
import os
import sys
import time
import requests
from PyQt5.QtWidgets import QMainWindow,QApplication,QDialog
from PyQt5.QtCore import pyqtSignal
from PyQt5.QtGui import QStandardItemModel,QStandardItem

import logging
import threading

from qt_material import apply_stylesheet

from ui import Ui_MainWindow
from start_ui import Ui_Dialog
from ewt_core import Ewt_upload_progress

super_core_flag = 0
is_promise = 0


class StartDialogWindow(QDialog,Ui_Dialog):

    def __init__(self, parent=None):
        super(StartDialogWindow,self).__init__(parent)
        self.setupUi(self)
        self.button_ok.clicked.connect(self.ok)
        
    def ok(self):
        if self.promise_input.text() == "我保证会好好学习，合理利用此工具，并已知悉此工具可能存在的未知风险":
            myWin.start_1()
            global is_promise
            is_promise = 1
            self.accept()

    def closeEvent(self, event):
        sys.exit()


class MyWindow(QMainWindow,Ui_MainWindow,Ewt_upload_progress):

    update_tableview_signal = pyqtSignal()
    add_log_signal = pyqtSignal(str)

    def __init__(self, parent=None):
        super(MyWindow,self).__init__(parent)
        self.setupUi(self)
        
        #设置数据层次结构，4行4列
        self.model=QStandardItemModel(4,0)
        #设置水平方向四个头标签文本内容
        self.model.setHorizontalHeaderLabels(["Date","Subject","Title","Ratio"])
        self.tableView.setModel(self.model)

        self.update_tableview_signal.connect(self.update_tableview)
        self.add_log_signal.connect(self.add_log)

        try:
            res = requests.get(url="https://f.m.suning.com/api/ct.do")
            data = json.loads(res.text)
            current_time = data['currentTime']
        except:
            try:
                res = requests.get(url="http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp")
                data = json.loads(res.text)
                current_time = int(data['data']['t'])
            except:
                self.add_log("[Error] System time self check failed, network abnormality.")
                return
        sys_time = round(time.time()*1000)
        if sys_time > current_time +5000 or sys_time < current_time -5000:
            self.add_log("[Error] Your system clock is not accurate, with an error of more than 3 seconds. Please proofread and restart the program.")
            return

        self.start_button.clicked.connect(self.check_start)
            

    def add_log(self,msg):
        self.log_browser.append(msg)
        self.log_browser.moveCursor(self.log_browser.textCursor().End) #光标移到末尾

    def update_tableview(self):
        # update remain time
        if self.time_remain<100*60:
            time_remain = round(self.time_remain/60,1)
        else:
            time_remain = round(self.time_remain/60)
        self.time_remain_lcd.display(time_remain)

        self.model=QStandardItemModel(len(self.lessons),0)
        self.model.setHorizontalHeaderLabels(["Date","Subject","Title","Ratio"])
        for row in range(0,len(self.lessons)):
            self.model.setItem(row,0,QStandardItem(self.lessons[row]['day_show']))
            self.model.setItem(row,1,QStandardItem(self.lessons[row]['subjectName']))
            self.model.setItem(row,2,QStandardItem(self.lessons[row]['title']))
            newitem = QStandardItem(f"{round(self.lessons[row]['ratio']*100,3)}%")
            self.model.setItem(row,3,newitem)

        self.tableView.setColumnWidth(0, 75)
        self.tableView.setColumnWidth(1, 90)
        self.tableView.setColumnWidth(2, 430)
        self.tableView.setColumnWidth(3, 50)
        self.tableView.horizontalHeader().setStretchLastSection(True)
        self.tableView.setModel(self.model)

    def lock_login_form(self,a):
        self.settings.setEnabled(a)

    def check_start(self):
        self.lock_login_form(False)
        account = self.account_input.text()
        password = self.password_input.text()
        speed = self.speed_input.text()
        task_advance_day = self.task_advance_day_input.text()
        if account=="" or password=="":
            self.add_log("[Warning] Account or Password cannot be empty!")
            self.lock_login_form(True)
            return
        if speed=="":
            self.add_log("[Warning] Speed cannot be empty!")
            self.lock_login_form(True)
            return
        if task_advance_day=="":
            self.add_log("[Warning] Advance Day cannot be empty!")
            self.lock_login_form(True)
            return
        try:
            speed = round(float(speed),2)
        except:
            self.add_log("[Warning] Speed must be an integer or floating number")
            self.lock_login_form(True)
            return
        try:
            task_advance_day = int(task_advance_day)
        except:
            self.add_log("[Warning] Advance Day must be an integer")
            self.lock_login_form(True)
            return

        if speed<1 or speed>2:
            self.add_log("[Warning] Speed cannot be greater than 2 or less than 1")
            self.lock_login_form(True)
            return
        if task_advance_day>1:
            self.add_log("[Warning] Advance Day cannot be greater than 1")
            self.lock_login_form(True)
            return
        

        subject_filter = []
        if self.sf1.isChecked(): subject_filter +=[1]
        if self.sf2.isChecked(): subject_filter +=[2]
        if self.sf3.isChecked(): subject_filter +=[3]
        if self.sf4.isChecked(): subject_filter +=[4]
        if self.sf5.isChecked(): subject_filter +=[5]
        if self.sf6.isChecked(): subject_filter +=[6]
        if self.sf7.isChecked(): subject_filter +=[7]
        if self.sf8.isChecked(): subject_filter +=[8]
        if self.sf9.isChecked(): subject_filter +=[9]
        if self.sf14.isChecked(): subject_filter +=[14]
        if self.sf15.isChecked(): subject_filter +=[15]

        account_change = 0

        global super_core_flag
        if super_core_flag==0:
            super(Ewt_upload_progress,self).__init__(account, password, task_advance_day,subject_filter,1,speed)
            super_core_flag = 1
        else:
            account_change = 1 if self.account!=account else 0
            self.account = account
            self.password = password
            self.task_advance_day = task_advance_day
            self.subject_filter = subject_filter
            self.speed = speed

        if is_promise==0 or account_change:
            self.start_dialog_window = StartDialogWindow()
            self.start_dialog_window.show()
        else:
            self.start_1()
    
    def start_1(self):
        self.lessons = []
        t1 = threading.Thread(target=self.start_run)
        t1.daemon = True
        t1.start()
        
    def error_handling(self,level,code,msg):
        logging.error(f'[{code}][account:{self.account}],{msg}')
        self.add_log_signal.emit(f"[{code}] {msg}")
        self.lock_login_form(True)
        raise Exception

    def info_handling(self,level,code,msg):
        logging.info(f'[{code}][account:{self.account}],{msg}')
        self.add_log_signal.emit(f"[{code}] {msg}")

    def info_handling_n(self,level,code,msg):
        logging.info(f'[{code}][account:{self.account}],{msg}')
        


if __name__ == "__main__":
    app = QApplication(sys.argv)
    apply_stylesheet(app, theme='dark_teal.xml')
    myWin = MyWindow()
    myWin.show()
    sys.exit(app.exec_())
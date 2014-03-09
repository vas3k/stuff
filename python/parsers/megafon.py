# -*- coding: utf-8 -*-
def megafon_balance(login, password):
    MEGAFON_API = "https://sibsg.megafon.ru/WIDGET_INFO/GET_INFO?X_Username=%s&X_Password=%s&CHANNEL=WYANDEX&LANG_ID=1&P_RATE_PLAN_POS=1&P_PAYMENT_POS=2&P_ADD_SERV_POS=4&P_DISCOUNT_POS=3"
    data = urllib2.urlopen(MEGAFON_API % (login, password)).read()
    regex = re.compile(r'<div title=\\"Ваш баланс\\" class=\\"subs_balance balance_good\\">(.+?)<span>', re.UNICODE)
    result = float(regex.findall(data)[0])
    return round(result, 2)


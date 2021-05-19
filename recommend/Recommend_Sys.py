import pandas as pd
import numpy as np
import random
import matplotlib.pyplot as plt

def flip90_right(arr):
    new_arr = arr.reshape(arr.size)
    new_arr = new_arr[::-1]
    new_arr = new_arr.reshape(arr.shape)
    new_arr = np.transpose(new_arr)[::-1]
    return new_arr

def flip90_left(arr):
    new_arr = np.transpose(arr)
    new_arr = new_arr[::-1]
    return new_arr

# def preprocesser(data):
#     for person in range(data.shape[0]):
#         # 是否抽菸
#         if data["smoke"][person] == "n":
#             data["smoke"][person] = random.uniform(0.0, 4.9)
#         else:
#             data["smoke"][person] = random.uniform(5.1, 10.9)
#         # 是否喝酒
#         if data["drink"][person] == "n":
#             data["drink"][person] = random.uniform(7.0, 10.9)
#         elif data["drink"][person] == "seldom":
#             data["drink"][person] = random.uniform(3.1, 6.9)
#         elif data["drink"][person] == "y":
#             data["drink"][person] = random.uniform(0.0, 3.0)
#         # 寵物
#         if data["pet"][person] == "n":
#             data["pet"][person] = random.uniform(7.0, 10.9)
#         elif data["pet"][person] == "want":
#             data["pet"][person] = random.uniform(3.1, 6.9)
#         elif data["pet"][person] == "y":
#             data["pet"][person] = random.uniform(0.0, 3.0)
#         # 起床
#         if data["wake"][person] == "7.b":
#             data["wake"][person] = random.uniform(0.0, 1.5)
#         elif data["wake"][person] == "7. ~ 9.":
#             data["wake"][person] = random.uniform(1.6, 5.0)
#         elif data["wake"][person] == "9. ~ 11.":
#             data["wake"][person] = random.uniform(5.1, 8.5)
#         elif data["wake"][person] == "11.a":
#             data["wake"][person] = random.uniform(8.6, 10.0)
#         # 睡眠
#         if data["sleep"][person] == "reverse":
#             data["sleep"][person] = random.uniform(0.0, 1.5)
#         elif data["sleep"][person] == "2.a":
#             data["sleep"][person] = random.uniform(1.6, 4.0)
#         elif data["sleep"][person] == "0.~ 2.":
#             data["sleep"][person] = random.uniform(4.1, 6.0)
#         elif data["sleep"][person] == "10.~ 00.":
#             data["sleep"][person] = random.uniform(6.0, 8.6)
#         elif data["sleep"][person] == "10.b":
#             data["sleep"][person] = random.uniform(8.6, 10.0)
#         # 整潔
#         if data["clean"][person] == "n":
#             data["clean"][person] = random.uniform(0.0, 1.5)
#         elif data["clean"][person] == "month":
#             data["clean"][person] = random.uniform(1.6, 5.0)
#         elif data["clean"][person] == "week":
#             data["clean"][person] = random.uniform(5.1, 8.5)
#         elif data["clean"][person] == "day":
#             data["clean"][person] = random.uniform(8.6, 10.0)
#         # 衛浴
#         if data["bath"][person] == "y":
#             data["bath"][person] = random.uniform(7.0, 10.9)
#         elif data["bath"][person] == "rule":
#             data["bath"][person] = random.uniform(3.1, 6.9)
#         elif data["bath"][person] == "n":
#             data["bath"][person] = random.uniform(0.0, 3.0)
#         # 帶人回家
#         if data["back"][person] == "y":
#             data["back"][person] = random.uniform(0.0, 1.5)
#         elif data["back"][person] == "agree":
#             data["back"][person] = random.uniform(1.6, 5.0)
#         elif data["back"][person] == "absence":
#             data["back"][person] = random.uniform(5.1, 8.5)
#         elif data["back"][person] == "n":
#             data["back"][person] = random.uniform(8.6, 10.0)

#     data["m_smoke"]=data["m_smoke"].map({"outside":5,"y":10,"n":0})
#     data["m_drink"]=data["m_drink"].map({"ok":5,"y":10,"n":0})
#     data["m_back"]=data["m_back"].map({"seldom":5,"n":10,"y":0})
#     data["m_noice"]=data["m_noice"].map({"exam":5,"y":10,"n":0})
#     # fits["personality"]=users["personality"].map({"INFP":0, "ENFP":1, "INFJ":2, "ENFJ":3, "INTJ":4, "ENTJ":5, "INTP":6, "ENTP":7, "ISFP":8, "ESFP":9, "ISTP":10, "ESTP":11, "ISFJ":12, "ESFJ":13, "ISTJ":14, "ESTJ":15})
#     print(data)

def preprocesser(data):
  data["personality"]=data["personality"].map({"ISTJ":1,"ISFJ":2,"INFJ":3,"INTJ":4,"ISTP":5,"ISFP":6,"INFP":7,"INTP":8,"ESTP":9,"ESFP":10,"ENFP":11,"ENTP":12,"ESTJ":13,"ESFJ":14,"ENFJ":15,"ENTJ":16})
  # data["personality"]
  data["m_smoke"]=data["m_smoke"].map({"outside":5,"y":10,"n":0})
  data["m_drink"]=data["m_drink"].map({"ok":5,"y":10,"n":0})
  data["m_back"]=data["m_back"].map({"seldom":5,"n":10,"y":0})
  data["m_noice"]=data["m_noice"].map({"exam":5,"y":10,"n":0})
  data["drink"]=data["drink"].map({"seldom":5,"n":10,"y":0})
  data["pet"]=data["pet"].map({"want":5,"n":10,"y":0})
  data["smoke"]=data["smoke"].map({"n":10,"y":0})
  data["wake"]=data["wake"].map({"9. ~ 11.":7,"7. ~ 9.":3,"11.a":10,"7.b":0})
  data["sleep"]=data["sleep"].map({"2.a":7,"0.~ 2.":5,"10.~ 00.":3,"reverse":10,"10.b":0})
  data["clean"]=data["clean"].map({"week":7,"month":3,"day":10,"n":0})
  data["bath"]=data["bath"].map({"rule":5,"y":10,"n":0})
  data["back"]=data["back"].map({"absence":7,"agree":3,"n":10,"y":0})
  return data

# fits_per = pd.read_csv('User.csv', sep=',', error_bad_lines=False, usecols=[1,2], encoding="latin-1")
fits = pd.read_csv('User.csv', sep=',', error_bad_lines=False, usecols=[1,2,3,4,5,6,7,8,9,10,11,12,13,14], encoding="latin-1")
fits = preprocesser(fits)
# print(fits)
# users = pd.read_csv('User.csv', sep=',', error_bad_lines=False, usecols=[1,2], encoding="latin-1")
users = pd.read_csv('User.csv', sep=',', error_bad_lines=False, usecols=[1,2,3,4,5,6,7,8,9,10,11,12,13,14], encoding="latin-1")
users = preprocesser(users)
# print(type(users))
# print(users)
match = pd.read_csv('match.csv', sep=',', error_bad_lines=False, usecols=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], encoding="latin-1")
ratings = pd.read_csv('Roommate.csv', sep=',', error_bad_lines=False, usecols=[1,2,3], encoding="latin-1")

def extract(data, mem):
  mem = np.array(np.array(mem))
  mem = mem.flatten()
  mem = list(set(mem))
  mem=[i - 2 for i in mem]

  data = np.array(data)
  out = data[mem]
  return out

def replaceNAN(dataMat):
  nan_dataMat = np.array(dataMat)
  nan_dataMat[np.isnan(nan_dataMat)] = 0
  return nan_dataMat

def pca(dataMat, k):
  dataMat = replaceNAN(dataMat)
  average = np.mean(dataMat, axis=0)
  m, n = np.shape(dataMat)
  meanRemoved = dataMat - np.tile(average, (m,1))
  normData = meanRemoved / np.std(dataMat)
  covMat = np.cov(normData.T)
  eigValue, eigVec = np.linalg.eig(covMat)
  eigValInd = np.argsort(-eigValue)
  selectVec = np.matrix(eigVec.T[:k])
  finalData = normData * selectVec.T
  return finalData

# take the characters of specific matrix
k = 3

# user_pca
user = extract(users, ratings['user'])
user_pca = pca(user,k)
# print(user_pca.shape)

# fit_pca
fit = y=extract(fits, ratings['fit'])
fit_pca = flip90_right(pca(fit,k))
# print(fit_pca.shape)

average_rating = pd.DataFrame(ratings.groupby('fit')['satisfy'].mean())
average_rating['ratingCount'] = pd.DataFrame(ratings.groupby('fit')['satisfy'].count())
average_rating.sort_values('ratingCount', ascending=False).head(20)

ratings_pivot = ratings.pivot(index='user', columns='fit', values="satisfy").fillna(0)

user_list=list(ratings_pivot.index)  #user
fit_list=list(ratings_pivot.columns)  #fit
#Extract non-zero mark
from scipy.sparse import coo_matrix
R = coo_matrix(ratings_pivot.values)

#  Factor matrix shape
M,N=R.shape
# No of Factors - 3
K=3            #try to change
# using random values of P and Q 
P=np.random.rand(M,K)
Q=np.random.rand(K,N)
# print("Q shape", Q.shape)

from numpy.linalg import norm
def error(R,P,Q,lamda=0.02):
    ratings = R.data
    rows = R.row
    cols = R.col
    e = 0 
    for ui in range(len(ratings)):
        rui=ratings[ui]
        u = rows[ui]
        i = cols[ui]
        if rui>0:
            e= e + pow(rui-np.dot(P[u,:],Q[:,i]),2)+lamda*(pow(norm(P[u,:]),2)+pow(norm(Q[:,i]),2))
    return e

# print("dot:",np.dot([1,1,1,1,1],[1,1,1,1,1]))
# print("norm:",norm([1,1,1,1,1]))
user_pca = np.array(user_pca)
fit_pca = np.array(fit_pca)
e = error(R, user_pca, fit_pca)
# error(R,P,Q)

rmse = np.sqrt(error(R,P,Q)/len(R.data))

x_round = []
y_rmse = []
y_error = []
x_round.append(0)
y_rmse.append(rmse)
y_error.append(e)

def SGD(R, K, lamda=0.02,steps=10, gamma=0.001):
    
    # M,N = R.shape
    # P = np.random.rand(M,K)
    # Q = np.random.rand(K,N)
    P = user_pca
    Q = fit_pca
    
    rmse = np.sqrt(error(R,P,Q,lamda)/len(R.data))
    # print("Initial RMSE: "+str(rmse))
    
    for step in range(steps):
        for ui in range(len(R.data)):
            rui=R.data[ui]
            u = R.row[ui]
            i = R.col[ui]
            if rui>0:
                eui=rui-np.dot(P[u,:],Q[:,i])
                P[u,:]=P[u,:]+gamma*2*(eui*Q[:,i]-lamda*P[u,:])
                Q[:,i]=Q[:,i]+gamma*2*(eui*P[u,:]-lamda*Q[:,i])
        rmse = np.sqrt(error(R,P,Q,lamda)/len(R.data))
        if rmse<0.5:
            break
    # print("Final RMSE: "+str(rmse))
    return P,Q

P,Q=SGD(R,K=10,gamma=0.0008,lamda=0.02, steps=1000)  #try to change the argument number
all_user_ratings =np.matmul(P, Q)

# plt.plot(x_round, y_rmse)
# plt.title('Learning Line Chart')
# plt.xlabel('Round')
# plt.ylabel('RMSE')
# plt.show()

# print(all_user_ratings)
all_user_ratings_df = pd.DataFrame(np.round(all_user_ratings,4),columns=fit_list, index=user_list)
# print(all_user_ratings_df.shape)
# print(all_user_ratings_df.head(10))
all_user_ratings_df1=all_user_ratings_df.transpose()
# print(all_user_ratings_df1.head())
top_five_df= all_user_ratings_df1[2].sort_values(ascending=False)
print(top_five_df.head(5))
from flask import Flask, jsonify, request
from flask.wrappers import Request
from flask_cors import CORS
import pandas as pd
import numpy as np
import random
import matplotlib.pyplot as plt
from scipy.sparse import coo_matrix
from numpy.linalg import norm

DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/pythonApi/recommend", methods=["POST"])
def function():
    post_data = request.get_json()
    id = post_data.get("id")
    personality = post_data.get("personality")
    smoke = post_data.get("smoke")
    drink = post_data.get("drink")
    pet = post_data.get("pet")
    wake = post_data.get("wake")
    sleep = post_data.get("sleep")
    clean = post_data.get("clean")
    bath = post_data.get("bath")
    back = post_data.get("back")
    m_smoke = post_data.get("m_smoke")
    m_drink = post_data.get("m_drink")
    m_back = post_data.get("m_back")
    m_noice = post_data.get("m_noice")
    s_custom = post_data.get("s_custom")
    clock = post_data.get("clock")
    sleep_reason = post_data.get("sleep_reason")

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

    def preprocesser(data):
        data["personality"] = data["personality"].map(
            {
                "ISTJ": 1,
                "ISFJ": 2,
                "INFJ": 3,
                "INTJ": 4,
                "ISTP": 5,
                "ISFP": 6,
                "INFP": 7,
                "INTP": 8,
                "ESTP": 9,
                "ESFP": 10,
                "ENFP": 11,
                "ENTP": 12,
                "ESTJ": 13,
                "ESFJ": 14,
                "ENFJ": 15,
                "ENTJ": 16,
            }
        )
        # data["personality"]
        data["m_smoke"] = data["m_smoke"].map({"outside": 5, "y": 10, "n": 0})
        data["m_drink"] = data["m_drink"].map({"ok": 5, "y": 10, "n": 0})
        data["m_back"] = data["m_back"].map({"seldom": 5, "n": 10, "y": 0})
        data["m_noice"] = data["m_noice"].map({"exam": 5, "y": 10, "n": 0})
        data["drink"] = data["drink"].map({"seldom": 5, "n": 10, "y": 0})
        data["pet"] = data["pet"].map({"want": 5, "n": 10, "y": 0})
        data["smoke"] = data["smoke"].map({"n": 10, "y": 0})
        data["wake"] = data["wake"].map(
            {"9. ~ 11.": 7, "7. ~ 9.": 3, "11.a": 10, "7.b": 0}
        )
        data["sleep"] = data["sleep"].map(
            {"2.a": 7, "0.~ 2.": 5, "10.~ 00.": 3, "reverse": 10, "10.b": 0}
        )
        data["clean"] = data["clean"].map({"week": 7, "month": 3, "day": 10, "n": 0})
        data["bath"] = data["bath"].map({"rule": 5, "y": 10, "n": 0})
        data["back"] = data["back"].map({"absence": 7, "agree": 3, "n": 10, "y": 0})
        return data

    new = pd.DataFrame.from_dict(
        {
            "personality": [personality],
            "smoke": [smoke],
            "drink": [drink],
            "pet": [pet],
            "wake": [wake],
            "sleep": [sleep],
            "clean": [clean],
            "bath": [bath],
            "back": [back],
            "m_smoke": [m_smoke],
            "m_drink": [m_drink],
            "m_back": [m_back],
            "m_noice": [m_noice],
        }
    )

    # fits_per = pd.read_csv('User.csv', sep=',', error_bad_lines=False, usecols=[1,2], encoding="latin-1")
    fits = pd.read_csv(
        "User.csv",
        sep=",",
        error_bad_lines=False,
        usecols=[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        encoding="latin-1",
    )
    fits = fits.append(new, ignore_index=True)
    fits = preprocesser(fits)
    # print(fits)
    # users = pd.read_csv('User.csv', sep=',', error_bad_lines=False, usecols=[1,2], encoding="latin-1")
    users = pd.read_csv(
        "User.csv",
        sep=",",
        error_bad_lines=False,
        usecols=[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        encoding="latin-1",
    )
    users = users.append(new, ignore_index=True)
    users = preprocesser(users)
    # print(type(users))
    # print(users)
    match = pd.read_csv(
        "match.csv",
        sep=",",
        error_bad_lines=False,
        usecols=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        encoding="latin-1",
    )
    ratings = pd.read_csv(
        "Roommate.csv",
        sep=",",
        error_bad_lines=False,
        usecols=[1, 2, 3],
        encoding="latin-1",
    )

    x, y = np.shape(ratings)
    people, p = np.shape(users)
    o_arr = []
    for i in range(people):
        o_arr.append(i + 2)  # 記得修改
    arr = set(o_arr)
    # print(type(arr))
    tmp_u = ratings["user"]
    tmp_u = set(tmp_u)
    tmp_f = ratings["fit"]
    tmp_f = set(tmp_f)

    arr = arr - (tmp_u & tmp_f)

    for i in arr:
        ratings.loc[x] = i, i, 0
        x = x + 1
    x = ratings["user"]
    x = set(x)
    y = ratings["fit"]
    y = set(y)

    def extract(data, mem):
        mem = np.array(np.array(mem))
        mem = mem.flatten()
        mem = list(set(mem))
        mem = [i - 2 for i in mem]

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
        meanRemoved = dataMat - np.tile(average, (m, 1))
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
    user = extract(users, ratings["user"])
    user_pca = pca(user, k)
    # print(user_pca.shape)

    # fit_pca
    fit = y = extract(fits, ratings["fit"])
    fit_pca = flip90_right(pca(fit, k))
    # print(fit_pca.shape)

    average_rating = pd.DataFrame(ratings.groupby("fit")["satisfy"].mean())
    average_rating["ratingCount"] = pd.DataFrame(
        ratings.groupby("fit")["satisfy"].count()
    )
    average_rating.sort_values("ratingCount", ascending=False).head(20)

    ratings_pivot = ratings.pivot(index="user", columns="fit", values="satisfy").fillna(
        0
    )

    user_list = list(ratings_pivot.index)  # user
    fit_list = list(ratings_pivot.columns)  # fit
    # Extract non-zero mark
    from scipy.sparse import coo_matrix

    R = coo_matrix(ratings_pivot.values)

    #  Factor matrix shape
    M, N = R.shape
    # No of Factors - 3
    K = 3  # try to change
    # using random values of P and Q
    P = np.random.rand(M, K)
    Q = np.random.rand(K, N)
    # print("Q shape", Q.shape)

    from numpy.linalg import norm

    def error(R, P, Q, lamda=0.02):
        ratings = R.data
        rows = R.row
        cols = R.col
        e = 0
        for ui in range(len(ratings)):
            rui = ratings[ui]
            u = rows[ui]
            i = cols[ui]
            if rui > 0:
                e = (
                    e
                    + pow(rui - np.dot(P[u, :], Q[:, i]), 2)
                    + lamda * (pow(norm(P[u, :]), 2) + pow(norm(Q[:, i]), 2))
                )
        return e

    # print("dot:",np.dot([1,1,1,1,1],[1,1,1,1,1]))
    # print("norm:",norm([1,1,1,1,1]))
    user_pca = np.array(user_pca)
    fit_pca = np.array(fit_pca)
    e = error(R, user_pca, fit_pca)
    # error(R,P,Q)

    rmse = np.sqrt(error(R, P, Q) / len(R.data))

    x_round = []
    y_rmse = []
    y_error = []
    x_round.append(0)
    y_rmse.append(rmse)
    y_error.append(e)

    def SGD(R, K, lamda=0.02, steps=10, gamma=0.001):

        # M,N = R.shape
        # P = np.random.rand(M,K)
        # Q = np.random.rand(K,N)
        P = user_pca
        Q = fit_pca

        rmse = np.sqrt(error(R, P, Q, lamda) / len(R.data))
        # print("Initial RMSE: "+str(rmse))

        for step in range(steps):
            for ui in range(len(R.data)):
                rui = R.data[ui]
                u = R.row[ui]
                i = R.col[ui]
                if rui > 0:
                    eui = rui - np.dot(P[u, :], Q[:, i])
                    P[u, :] = P[u, :] + gamma * 2 * (eui * Q[:, i] - lamda * P[u, :])
                    Q[:, i] = Q[:, i] + gamma * 2 * (eui * P[u, :] - lamda * Q[:, i])
            rmse = np.sqrt(error(R, P, Q, lamda) / len(R.data))
            if rmse < 0.5:
                break
        # print("Final RMSE: "+str(rmse))
        return P, Q

    P, Q = SGD(
        R, K=10, gamma=0.0008, lamda=0.02, steps=1000
    )  # try to change the argument number
    all_user_ratings = np.matmul(P, Q)

    person = 219  # who？->要輸入第幾個註冊的歐，不能輸id或名字
    top_five_df = 5  # 前幾適配的室友

    # print(all_user_ratings)
    all_user_ratings_df = pd.DataFrame(
        np.round(all_user_ratings, 4), columns=fit_list, index=user_list
    )
    # print(all_user_ratings_df.shape)
    # print(all_user_ratings_df.head(10))
    all_user_ratings_df1 = all_user_ratings_df.transpose()
    # print(all_user_ratings_df1.head())
    top = np.array(all_user_ratings_df1[person])
    top = pd.Series(top, o_arr)
    top = top.sort_values(ascending=False)
    data = pd.read_csv(
        "User.csv", sep=",", error_bad_lines=False, usecols=[1], encoding="latin-1"
    )
    new = pd.DataFrame.from_dict({"id": [id]})
    data = data.append(new, ignore_index=True)
    data = np.array(data)
    data = data.flatten()

    index=-1
    output=['','','','','']
    for i in range(top_five_df):
        index=index+1
        output[index]=data[top.index[i] - 2]
        print(data[top.index[i]-2])


    return jsonify(output) 
    


if __name__ == "__main__":
    app.run()

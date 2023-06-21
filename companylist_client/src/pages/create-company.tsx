import React from "react";
import styles from "../styles/Home.module.css";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const CreateCompany = () => {
  const [companycode, setCompanyCode] = useState("");
  const [status, setStatus] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [postcode, setPostCode] = useState("");
  const [location, setLocation] = useState("");
  const [representative1, setRepresentitive1] = useState("");
  const [representative2, setRepresentitive2] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cookies = parseCookies();

    // APIを叩く
    try {
      await axios.post(
        "http://localhost:3001/api/v1/companies",
        {
          companycode: companycode,
          status: status,
          name1: name1,
          name2: name2,
          postcode: postcode,
          location: location,
          representative1: representative1,
          representative2: representative2,
          phone: phone,
          // sales1: sales1,
          // revenues1: revenues1,
          // sales2: sales2,
          // revenues2: revenues2,
          // sales3: sales3,
          // revenues3: revenues3,
        },
        {
          headers: {
            "Content-Type": "application/json",
            uid: cookies["uid"],
            client: cookies["client"],
            "access-token": cookies["access-token"],
          },
        }
      );
      router.push("/");
    } catch (err) {
      alert("登録に失敗しました");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>会社新規登録</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>企業コード</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCompanyCode(e.target.value)
          }
        ></input>
        <label className={styles.label}>上場状況</label>
        <div>
          <div>
            <input
              type="radio"
              name="status"
              value="上場"
              className={styles.input}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStatus(e.target.value)
              }
            />
            <label>上場</label>
          </div>
          <div>
            <input
              type="radio"
              name="status"
              value="未上場"
              className={styles.input}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStatus(e.target.value)
              }
            />
            <label>未上場</label>
          </div>
        </div>

        <label className={styles.label}>企業名</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName1(e.target.value)
          }
        ></input>
        <label className={styles.label}>企業名(カナ)</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName2(e.target.value)
          }
        ></input>
        <label className={styles.label}>郵便番号</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPostCode(e.target.value)
          }
        ></input>
        <label className={styles.label}>所在地</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLocation(e.target.value)
          }
        ></input>
        <label className={styles.label}>代表者名</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRepresentitive1(e.target.value)
          }
        ></input>
        <label className={styles.label}>代表者名(カナ)</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRepresentitive2(e.target.value)
          }
        ></input>
        <label className={styles.label}>電話番号</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPhone(e.target.value)
          }
        ></input>
        <button type="submit" className={styles.button}>
          登録
        </button>
      </form>
    </div>
  );
};

export default CreateCompany;

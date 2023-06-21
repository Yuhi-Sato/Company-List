import React from "react";
import styles from "../styles/Home.module.css";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const CreateAccount = () => {
  const [companycode, setCompanyCode] = useState("");
  const [year, setYear] = useState("");
  const [sales, setSales] = useState("");
  const [revenues, setRevenues] = useState("");

  const cookies = parseCookies();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // APIを叩く
    try {
      await axios.post(
        "http://localhost:3001/api/v1/accounts",
        {
          companycode: companycode,
          year: year,
          sales: sales,
          revenues: revenues,
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
      <h1 className={styles.title}>会計新規登録</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>企業コード</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCompanyCode(e.target.value)
          }
        ></input>
        <label className={styles.label}>西暦</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setYear(e.target.value)
          }
        ></input>
        <label className={styles.label}>売上</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSales(e.target.value)
          }
        ></input>
        <label className={styles.label}>利益</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRevenues(e.target.value)
          }
        ></input>

        <button type="submit" className={styles.button}>
          登録
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;

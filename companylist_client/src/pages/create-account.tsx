import React from "react";
import styles from "../styles/Home.module.css";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Link from "next/link";

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
      <div className={styles.menue}>
        <Link href="/" className={styles.createButton}>
          企業一覧
        </Link>
        <Link href="/search-company" className={styles.createButton}>
          企業を検索
        </Link>
        <br></br>
        <Link href="/create-company" className={styles.createButton}>
          企業を追加
        </Link>
        <br></br>
        <Link href="/create-account" className={styles.createButton}>
          会計を追加
        </Link>
      </div>
      <hr></hr>
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

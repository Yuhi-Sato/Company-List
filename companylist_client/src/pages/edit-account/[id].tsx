import React from "react";
import styles from "../../styles/Home.module.css";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Account } from "../../../src/types";
import { parseCookies } from "nookies";
import Link from "next/link";

type Props = {
  account: Account;
};

export async function getServerSideProps(context: any) {
  const id = context.params.id;
  const { req } = context;

  const res = await fetch(`http://localhost:3001/api/v1/accounts/${id}`, {
    headers: {
      "Content-Type": "application/json",
      uid: req.cookies["uid"],
      client: req.cookies["client"],
      "access-token": req.cookies["access-token"],
    },
  });
  const account = await res.json();

  return {
    props: {
      account,
    },
  };
}

const EditAccount = ({ account }: Props) => {
  const [companycode, setCompanyCode] = useState(account.companycode);
  const [year, setYear] = useState(account.year);
  const [sales, setSales] = useState(account.sales);
  const [revenues, setRevenues] = useState(account.revenues);

  let cookies = parseCookies();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // APIを叩く
    try {
      await axios.put(
        `http://localhost:3001/api/v1/accounts/${account.id}`,
        {
          companycode: companycode,
          sales: sales,
          year: year,
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
      alert("編集に失敗しました");
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
      <h1 className={styles.title}>会計編集</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>企業コード</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCompanyCode(e.target.value)
          }
          value={companycode}
        ></input>
        <label className={styles.label}>西暦</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setYear(e.target.value)
          }
          value={year}
        ></input>
        <label className={styles.label}>売上</label>
        <input
          type="number"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSales(e.target.valueAsNumber)
          }
          value={sales}
        ></input>
        <label className={styles.label}>利益</label>
        <input
          type="number"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRevenues(e.target.valueAsNumber)
          }
          value={revenues}
        ></input>

        <button type="submit" className={styles.button}>
          登録
        </button>
      </form>
    </div>
  );
};

export default EditAccount;

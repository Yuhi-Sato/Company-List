import React from "react";
import styles from "../../styles/Home.module.css";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Company, Account } from "../../../src/types";
import { parseCookies } from "nookies";

type Props = {
  company: Company;
  accounts: Account[];
};

export async function getServerSideProps(context: any) {
  const id = context.params.id;
  const { req } = context;

  const res = await fetch(`http://localhost:3001/api/v1/companies/${id}`, {
    headers: {
      "Content-Type": "application/json",
      uid: req.cookies["uid"],
      client: req.cookies["client"],
      "access-token": req.cookies["access-token"],
    },
  });
  const data = (await res.json()) as Props;
  const company = data.company;

  return {
    props: {
      company,
    },
  };
}

const EditCompany = ({ company }: Props) => {
  const [companycode, setCompanyCode] = useState(company.companycode);
  const [status, setStatus] = useState(company.status);
  const [name1, setName1] = useState(company.name1);
  const [name2, setName2] = useState(company.name2);
  const [postcode, setPostCode] = useState(company.postcode);
  const [location, setLocation] = useState(company.location);
  const [representative1, setRepresentitive1] = useState(
    company.representative1
  );
  const [representative2, setRepresentitive2] = useState(
    company.representative2
  );
  const [phone, setPhone] = useState(company.phone);

  const router = useRouter();
  let cookies = parseCookies();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // APIを叩く
    try {
      await axios.put(
        `http://localhost:3001/api/v1/companies/${company.id}`,
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
      <h1 className={styles.title}>会社編集</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>企業コード</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCompanyCode(e.target.value)
          }
          value={companycode}
        />
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
          value={name1}
        />
        <label className={styles.label}>企業名(カナ)</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName2(e.target.value)
          }
          value={name2}
        />
        <label className={styles.label}>郵便番号</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPostCode(e.target.value)
          }
          value={postcode}
        />
        <label className={styles.label}>所在地</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLocation(e.target.value)
          }
          value={location}
        />
        <label className={styles.label}>代表者名</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRepresentitive1(e.target.value)
          }
          value={representative1}
        />
        <label className={styles.label}>代表者名(カナ)</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRepresentitive2(e.target.value)
          }
          value={representative2}
        />
        <label className={styles.label}>電話番号</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPhone(e.target.value)
          }
          value={phone}
        />
        <button type="submit" className={styles.button}>
          登録
        </button>
      </form>
    </div>
  );
};

export default EditCompany;

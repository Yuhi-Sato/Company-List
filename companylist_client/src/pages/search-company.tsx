import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Company, Info } from "../types";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { parseCookies } from "nookies";

let query: string;

export async function getServerSideProps(context: any) {
  const { req } = context;

  const res = await fetch("http://localhost:3001/api/v1/companies", {
    headers: {
      "Content-Type": "application/json",
      uid: req.cookies["uid"],
      client: req.cookies["client"],
      "access-token": req.cookies["access-token"],
    },
  });
  const infos = await res.json();

  return {
    props: {
      infos,
    },
  };
}

export default function Home() {
  const router = useRouter();
  const [way, setWay] = useState("");
  const [companycode, setCompanyCode] = useState("");
  const [name1, setName1] = useState("");
  const [status, setStatus] = useState("");
  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");
  const [location3, setLocation3] = useState("");
  const [location4, setLocation4] = useState("");
  const [year, setYear] = useState<string>();
  const [sales_lower, setSales_lower] = useState("");
  const [sales_upper, setSales_upper] = useState("");
  const [revenues_lower, setRevenues_lower] = useState("");
  const [revenues_upper, setRevenues_upper] = useState("");

  const [infos, setInfos] = useState([]);
  const cookies = parseCookies();

  const clickButton = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !year &&
      (sales_lower || sales_upper || revenues_lower || revenues_upper)
    ) {
      alert("西暦は必須入力です");
      return;
    }
    let param = [];
    if (way) {
      param.push(`way=${way}`);
    }
    if (companycode) {
      param.push(`companycode=${companycode}`);
    }
    if (name1) {
      param.push(`company_name=${name1}`);
    }
    if (status) {
      param.push(`status=${status}`);
    }
    if (location1) {
      param.push(`location1=${location1}`);
    }
    if (location2) {
      param.push(`location2=${location2}`);
    }
    if (location3) {
      param.push(`location1=${location3}`);
    }
    if (location4) {
      param.push(`location1=${location4}`);
    }
    if (year) {
      param.push(`year=${year}`);
    }
    if (sales_lower) {
      param.push(`sales_lower=${sales_lower}`);
    }
    if (sales_upper) {
      param.push(`sales_upper=${sales_upper}`);
    }
    if (revenues_lower) {
      param.push(`revenues_lower=${revenues_lower}`);
    }
    if (revenues_upper) {
      param.push(`revenues_upper=${revenues_upper}`);
    }

    console.log(query);
    query = param.join(`&`);

    try {
      console.log(query);
      const response = await axios.get(
        `http://localhost:3001/api/v1/companies?${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            uid: cookies["uid"],
            client: cookies["client"],
            "access-token": cookies["access-token"],
          },
        }
      );

      setInfos(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleDelete = async (companyID: string) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/v1/companies/${companyID}`,
        {
          headers: {
            "Content-Type": "application/json",
            uid: cookies["uid"],
            client: cookies["client"],
            "access-token": cookies["access-token"],
          },
        }
      );

      const response = await axios.get(
        `http://localhost:3001/api/v1/companies?${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            uid: cookies["uid"],
            client: cookies["client"],
            "access-token": cookies["access-token"],
          },
        }
      );

      setInfos(response.data);
    } catch (err) {
      alert("削除に失敗しました");
    }
  };

  return (
    <>
      <div className={styles.searchcontainer}>
        <label className={styles.label}>検索方法</label>
        <div>
          <input
            type="radio"
            name="option"
            value="and"
            className={styles.input}
            onChange={(e) => setWay(e.target.value)}
          />
          and
          <input
            name="option"
            type="radio"
            value="or"
            className={styles.input}
            onChange={(e) => setWay(e.target.value)}
          />
          or
        </div>
        <label className={styles.label}>会社コード</label>
        <input
          type="text"
          value={companycode}
          className={styles.input}
          onChange={(e) => setCompanyCode(e.target.value)}
        />
        <br></br>
        <label className={styles.label}>会社名</label>
        <input
          type="text"
          value={name1}
          className={styles.input}
          onChange={(e) => setName1(e.target.value)}
        />
        <br></br>
        <label className={styles.label}>上場状況</label>
        <div>
          <input
            type="radio"
            name="status"
            value="上場"
            className={styles.input}
            onChange={(e) => setStatus(e.target.value)}
          />
          上場
          <input
            name="status"
            type="radio"
            value="未上場"
            className={styles.input}
            onChange={(e) => setStatus(e.target.value)}
          />
          未上場
          <input
            name="status"
            type="radio"
            value=""
            className={styles.input}
            onChange={(e) => setStatus(e.target.value)}
          />
          なし
        </div>
        <br></br>
        <label className={styles.label}>所在地1</label>
        <input
          type="text"
          value={location1}
          className={styles.input}
          onChange={(e) => setLocation1(e.target.value)}
        />
        <label className={styles.label}>所在地2</label>
        <input
          type="text"
          value={location2}
          className={styles.input}
          onChange={(e) => setLocation2(e.target.value)}
        />
        <label className={styles.label}>所在地3</label>
        <input
          type="text"
          value={location3}
          className={styles.input}
          onChange={(e) => setLocation3(e.target.value)}
        />
        <label className={styles.label}>所在地4</label>
        <input
          type="text"
          value={location4}
          className={styles.input}
          onChange={(e) => setLocation4(e.target.value)}
        />
        <br></br>
        <label className={styles.label}>西暦</label>
        <input
          type="number"
          value={year}
          className={styles.input}
          onChange={(e) => setYear(e.target.value)}
        />
        <br></br>
        <label className={styles.label}>売上</label>
        <input
          type="number"
          value={sales_lower}
          className={styles.input}
          onChange={(e) => setSales_lower(e.target.value)}
        />
        〜
        <input
          type="number"
          value={sales_upper}
          className={styles.input}
          onChange={(e) => setSales_upper(e.target.value)}
        />
        <br></br>
        <label className={styles.label}>利益</label>
        <input
          type="number"
          value={revenues_lower}
          className={styles.input}
          onChange={(e) => setRevenues_lower(e.target.value)}
        />
        〜
        <input
          type="number"
          value={revenues_upper}
          className={styles.input}
          onChange={(e) => setRevenues_upper(e.target.value)}
        />
        <br></br>
        <button onClick={clickButton} className={styles.createButton}>
          検索
        </button>
      </div>
      <div className={styles.searchContainer}>
        <h2>企業リスト</h2>
        <table className={styles.companyTable}>
          <thead>
            <tr>
              <th>会社コード</th>

              <th>企業名</th>
              <th>上場状況</th>
              <th>所在地</th>
              <th>売上({year})</th>
              <th>利益({year})</th>
            </tr>
          </thead>
          <tbody>
            {infos.map((info: Info) => (
              <tr key={info.id}>
                <td>{info.companycode}</td>

                <td>
                  <Link href={`companies/${info.id}`}>{info.name1}</Link>
                </td>
                <td>{info.status}</td>
                <td>{info.location}</td>
                <td>{info.sales}</td>
                <td>{info.revenues}</td>
                <td>
                  <Link href={`/edit-company/${info.company_id}`}>
                    <button className={styles.editButton}>Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(info.company_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

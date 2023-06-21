import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Company } from "../types";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

type Props = {
  companies: Company[];
};

export async function getServerSideProps(context: any) {
  const { req } = context;

  const res = await fetch("http://localhost:3001/api/v1/companies?all=true", {
    headers: {
      "Content-Type": "application/json",
      uid: req.cookies["uid"],
      client: req.cookies["client"],
      "access-token": req.cookies["access-token"],
    },
  });
  const companies = await res.json();

  return {
    props: {
      companies,
    },
  };
}

export default function Home({ companies }: Props) {
  const router = useRouter();
  const cookies = parseCookies();

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

      router.reload();
    } catch (err) {
      alert("削除に失敗しました");
    }
  };

  return (
    <>
      <div className={styles.homeContainer}>
        <h2>企業リスト</h2>
        <div className={styles.menue}>
          <Link href="/search-company" className={styles.createButton}>
            企業を検索
          </Link>
          <Link href="/create-company" className={styles.createButton}>
            企業を追加
          </Link>
          <Link href="/create-account" className={styles.createButton}>
            会計を追加
          </Link>
          <Link href="/index-accounts" className={styles.createButton}>
            会計一覧
          </Link>
        </div>

        <table className={styles.companyTable}>
          <thead>
            <tr>
              <th>企業名</th>
              <th>カナ</th>
              <th>上場状況</th>
              <th>所在地</th>
              <th>代表者名</th>
              <th>カナ</th>
              <th>電話番号</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company: Company) => (
              <tr key={company.id}>
                <td>
                  <Link href={`companies/${company.id}`}>{company.name1}</Link>
                </td>
                <td>{company.name2}</td>
                <td>{company.status}</td>
                <td>{company.location}</td>
                <td>{company.representative1}</td>
                <td>{company.representative2}</td>
                <td>{company.phone}</td>
                <td>
                  <Link href={`/edit-company/${company.id}`}>
                    <button className={styles.editButton}>Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(company.id)}
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

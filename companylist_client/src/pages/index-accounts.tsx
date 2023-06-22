import Link from "next/link";
import { Account } from "../types";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

type Props = {
  accounts: Account[];
};

export async function getServerSideProps(context: any) {
  const { req } = context;

  const res = await fetch("http://localhost:3001/api/v1/accounts", {
    headers: {
      "Content-Type": "application/json",
      uid: req.cookies["uid"],
      client: req.cookies["client"],
      "access-token": req.cookies["access-token"],
    },
  });
  const accounts = await res.json();

  return {
    props: {
      accounts,
    },
  };
}

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3001/api/v1/accounts");
//   const accounts = await res.json();

//   return {
//     props: {
//       accounts,
//     },
//     revalidate: 60 * 60 * 24,
//   };
// }

export default function Home({ accounts }: Props) {
  const router = useRouter();
  const cookies = parseCookies();

  const handleDelete = async (accountID: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/accounts/${accountID}`, {
        headers: {
          "Content-Type": "application/json",
          uid: cookies["uid"],
          client: cookies["client"],
          "access-token": cookies["access-token"],
        },
      });

      router.reload();
    } catch (err) {
      alert("削除に失敗しました");
    }
  };

  return (
    <>
      <div className={styles.homeContainer}>
        <h2>会計リスト</h2>
        <div className={styles.menue}>
          <Link href="/" className={styles.createButton}>
            ホーム
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
        <table className={styles.companyTable}>
          <thead>
            <tr>
              <th>企業コード</th>
              <th>西暦</th>
              <th>売上</th>
              <th>利益</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account: Account) => (
              <tr key={account.id}>
                <td>{account.companycode}</td>
                <td>{account.year}</td>
                <td>{account.sales}</td>
                <td>{account.revenues}</td>
                <td>
                  <Link href={`/edit-account/${account.id}`}>
                    <button className={styles.editButton}>Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(account.id)}
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

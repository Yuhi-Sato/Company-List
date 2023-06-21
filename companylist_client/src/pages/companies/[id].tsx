import { FormEvent, useState, ChangeEvent, ChangeEventHandler } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import { parseCookies } from "nookies";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Company {
  id: string;
  companycode: string;
  status: string;
  name1: string;
  name2: string;
  postcode: string;
  representative1: string;
  representative2: string;
  phone: string;
  email: string;
  sales1: Int16Array;
  revenues1: Int16Array;
  sales2: Int16Array;
  revenues2: Int16Array;
  sales3: Int16Array;
  revenues3: Int16Array;
  created_at: string;
  updated_at: string;
  location: string;
}

interface Accout {
  id: string;
  year: string;
  sales: Int16Array;
  revenues: Int16Array;
  companycode: string;
}

interface Memo {
  id: string;
  company_id: string;
  username: string;
  content: string;
  created_at: string;
  updated_at: string;
}

type Props = {
  company: Company;
  accounts: Accout[];
  memos: Memo[];
};

let url: string;

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
  url = `http://localhost:3001/api/v1/companies/${id}`;
  const data = (await res.json()) as Props;
  const company = data.company;
  const accounts = data.accounts;
  const memos = data.memos;

  return {
    props: {
      company,
      accounts,
      memos,
    },
  };
}

const CompanyandAccouts = ({ company, accounts, memos }: Props) => {
  const yearsArray = accounts.map((obj) => obj.year);
  const salesArray = accounts.map((obj) => obj.sales);
  const revenuesArray = accounts.map((obj) => obj.revenues);
  const ratesArray = accounts.map(
    (obj) => Number(obj.revenues) / Number(obj.sales)
  );
  const company_id = company.id;
  const cookies = parseCookies();
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
      },
    },
  };

  const data1 = {
    labels: yearsArray,
    datasets: [
      {
        label: "売上",
        data: salesArray,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "利益",
        data: revenuesArray,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const data2 = {
    labels: yearsArray,
    datasets: [
      {
        label: "利益率",
        data: ratesArray,
        borderColor: "rgba(50, 205, 50, 0.5)",
        backgroundColor: "rgba(50, 205, 50, 0.5)",
      },
    ],
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // APIを叩く
    try {
      await axios.post(
        "http://localhost:3001/api/v1/memos",
        {
          company_id: company_id,
          username: username,
          content: content,
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
      router.reload();
    } catch (err) {
      alert("登録に失敗しました");
    }
  };

  const handleDelete = async (memoID: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/memos/${memoID}`, {
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

  const handleTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setContent(e.target.value);
  };

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <h1>{company.name1}</h1>
        <h1>会社コード{company.companycode}</h1>
        <div className={styles.date}>作成日{company.created_at}</div>
        <div className={styles.date}>更新日{company.updated_at}</div>
      </div>
      <div className={styles.container}>
        <Line options={options} data={data1} />
      </div>
      <div className={styles.container}>
        <Line options={options} data={data2} />
      </div>

      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>ユーザー名</label>
          <input
            type="text"
            className={styles.input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          ></input>
          <br></br>
          <label className={styles.label}>メモ</label>
          <textarea
            rows={10}
            className={styles.textarea}
            onChange={handleTextareaChange}
          ></textarea>
          <button type="submit" className={styles.button}>
            登録
          </button>
        </form>
        <hr></hr>
        <h1>メモ一覧</h1>
        <div>
          {memos.map((memo: Memo) => (
            <div key={memo.id} className={styles.postCard}>
              <h2>{memo.username}</h2>
              <h2>{memo.content}</h2>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(memo.id)}
              >
                Delete
              </button>
              <div>作成日{memo.created_at}</div>
              <div>更新日{memo.updated_at}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CompanyandAccouts;

require 'csv'
 
CSV.foreach("db/ダミー企業情報.csv", headers: true) do |row|
    if Company.exists?(companycode: row["企業コード"])
        @company = Company.find_by(companycode: row["企業コード"])
        @company.update(
            status: row["上場状況"],
            name1: row["企業名"],
            name2: row["企業名（カナ）"],
            postcode: row["郵便番号"],
            location: row["所在地"],
            representative1: row["代表者名"],
            representative2: row["代表者名（カナ）"],
            phone: row["電話番号"]
        )
    else
        Company.create(
            companycode: row["企業コード"],
            status: row["上場状況"],
            name1: row["企業名"],
            name2: row["企業名（カナ）"],
            postcode: row["郵便番号"],
            location: row["所在地"],
            representative1: row["代表者名"],
            representative2: row["代表者名（カナ）"],
            phone: row["電話番号"]
        )
    end
    company = Company.find_by(companycode: row["企業コード"])
    Account.create(
        company_id: company.id,
        companycode: row["企業コード"],
        year: "2022",
        sales: row["売上（2022）"].delete(","),
        revenues: row["利益（2022）"].delete(",")
    )
    Account.create(
        company_id: company.id,
        companycode: row["企業コード"],
        year: "2021",
        sales: row["売上（2021）"].delete(","),
        revenues: row["利益（2021）"].delete(",")
    )
    Account.create(
        company_id: company.id,
        companycode: row["企業コード"],
        year: "2020",
        sales: row["売上（2020）"].delete(","),
        revenues: row["利益（2020）"].delete(",")
    )
end

CSV.foreach("db/ユーザー.csv", headers: true) do |row|
    User.create(
        email: row["email"],
        password: row["password"],
        admin: row["admin"]
    )
end
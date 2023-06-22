class AddCompanycodeAndYearToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_index :accounts, [:companycode, :year], unique:true
  end
end

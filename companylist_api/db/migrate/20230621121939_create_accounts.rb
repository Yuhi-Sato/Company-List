class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.integer :company_id
      t.string :companycode
      t.string :year
      t.integer :sales
      t.integer :revenues

      t.timestamps
    end
  end
end

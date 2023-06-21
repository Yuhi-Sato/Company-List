class CreateCompanies < ActiveRecord::Migration[7.0]
  def change
    create_table :companies do |t|
      t.string :companycode
      t.string :status
      t.string :name1
      t.string :name2
      t.string :postcode
      t.string :location
      t.string :representative1
      t.string :representative2
      t.string :phone

      t.timestamps
    end
    add_index :companies, :companycode, unique: true
  end
end

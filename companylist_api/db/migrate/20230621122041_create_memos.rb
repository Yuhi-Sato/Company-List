class CreateMemos < ActiveRecord::Migration[7.0]
  def change
    create_table :memos do |t|
      t.integer :company_id
      t.string :content
      t.string :username

      t.timestamps
    end
  end
end

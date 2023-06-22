class Api::V1::MemosController < ApplicationController
  before_action :authenticate_api_v1_user!
  load_and_authorize_resource

  def index
  end

  def create
    @memo = Memo.new(memo_params)
    if @memo.save
      render json: @memo, status: :created
    else 
      render json: @memo.errors, status: :upprocessable_entity
    end
  end

  def update
    @memo=Memo.find(params[:id])
    if @memo.update(memo_params)
      render json: @memo
    else
      render json: @memo.errors, status: :upprocessable_entity
    end
  end

  def destroy
    @memo = Memo.find(params[:id])
    @memo.destroy
  end

  def memo_params
    params.require(:memo).permit(:company_id, :username, :content)
  end
end

class Api::V1::AccountsController < ApplicationController
  before_action :authenticate_api_v1_user!
  # load_and_authorize_resource

  def index
    @accounts = Account.all.order("companycode ASC")
    render json: @accounts
  end

  def show
    @account = Account.find(params[:id])
    render json: @account,status: :created
  end

  def create
    @company = Company.find_by(companycode: params[:companycode])
    @account = Account.new(company_id: @company.id)
    @account.year = params[:year]
    @account.sales = params[:sales]
    @account.revenues = params[:revenues]
    @account.companycode = params[:companycode]
    if @account.save
      render json: @account,status: :created
    else
      render json: @account.errors, status: :upprocessable_entity
    end
  end

  def update
    @account=Account.find(params[:id])
    if @account.update(companycode: params[:companycode],year: params[:year],sales: params[:sales],revenues: params[:revenues])
      render json: @account
    else
      render json: @account.errors, status: :upprocessable_entity
    end
  end

  def destroy
    @account = Account.find(params[:id])
    @account.destroy
  end

end

class Api::V1::CompaniesController < ApplicationController
  before_action :authenticate_api_v1_user!
  load_and_authorize_resource

  def index
    @all = params[:all]
    if @all
      @companies = Company.all
      render json: @companies
    else
      if params[:way]
        @way = params[:way]
      else
        @way = "and"
      end
      @companycode = params[:companycode]
      @company_name = params[:company_name]
      @status = params[:status]
      @location1 = params[:location1]
      @location2 = params[:location2]
      @location3 = params[:location3]
      @location4 = params[:location4]
      @year = params[:year]
      @sales_upper = params[:sales_upper]
      @sales_lower = params[:sales_lower]
      @revenues_upper = params[:revenues_upper]
      @revenues_lower = params[:revenues_lower]

      if @sales_lower == nil
        @sales_lower = - (1<<60)
      end
      if @sales_upper == nil
        @sales_upper = 1<<60
      end
      if @revenues_lower == nil
        @revenues_lower = - (1<<60)
      end
      if @revenues_upper == nil
        @revenues_upper = 1<<60
      end

      requirements = []
      if @companycode
        requirements << ["companycode", @companycode]
      end
      if @company_name
        requirements << ["name1", @company_name]
      end
      if @status
        requirements << ["status", @status]
      end
      if @location1
        requirements << ["location", @location1]
      end
      if @location2
        requirements << ["location", @location2]
      end
      if @location3
        requirements << ["location", @location3]
      end
      if @location4
        requirements << ["location", @location4]
      end
      
      conditions = []
      placeholders = []
      requirements.each do |req|
        if req[0]=="companycode" or req[0]=="status"
          conditions << "#{req[0]} = ?"
          placeholders << "#{req[1]}"
        else
          conditions << "#{req[0]} LIKE ?"
          placeholders << "%#{req[1]}%"
        end
      end

      if !@year
        @infos = Company.where(conditions.join(" #{@way} "),*placeholders)
        render json: @infos
        return
      end
      
      if (!(@sales_lower==-(1<<60) and @sales_upper==1<<60))
        conditions << "(sales >= ? AND sales <= ? AND year=?)"
        placeholders << @sales_lower
        placeholders << @sales_upper
        placeholders << @year
      end
      if (!(@revenues_lower==-(1<<60) and @revenues_upper==1<<60))
        conditions << "(revenues >= ? AND revenues <= ? AND year=?)"
        placeholders << @revenues_lower
        placeholders << @revenues_upper
        placeholders << @year
      end
      
      @infos = Company.joins(:accounts).select("companies.*,accounts.*").where(conditions.join(" #{@way} "),*placeholders)

      render json: @infos
    end
  end

  def show
    @company = Company.find(params[:id])
    @accounts = Account.where(company_id: @company.id).order("year")
    @memos = Memo.where(company_id: @company.id)
    res = {}
    res["company"] = @company
    res["accounts"] = @accounts
    res["memos"] = @memos
    render json: res
  end

  def create
    @company = Company.new(company_params)
    if @company.save
      render json: @company, status: :created
    else 
      render json: @company.errors, status: :upprocessable_entity
    end
  end

  def update
    @company=Company.find(params[:id])
    if @company.update(company_params)
      render json: @company
    else
      render json: @company.errors, status: :upprocessable_entity
    end
  end

  def destroy
    @company = Company.find(params[:id])
    @company.destroy
  end

  private

  def company_params
    params.permit(:companycode,
      :status,
      :name1,
      :name2,
      :postcode,
      :location,
      :representative1,
      :representative2,
      :phone,
      :email,)
  end
end

class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
        include DeviseHackFakeSession
        
        def current_user
                current_api_v1_user
        end
end

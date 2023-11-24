import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req,  next) => {

    var request = req.clone();
    
    let token: string|null = sessionStorage.getItem("access_token");
    if(token !== null){
        request = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`)
        });
    }

    return next(request);

    /**
     * TODO: Pendente validar se o token expirou, atualizar o
     * token e refazer a requisição com o novo token atualizado.
     */
};

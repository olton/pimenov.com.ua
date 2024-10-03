globalThis.sendRequestForm = async (form) => {
    const result = await Email.send({
        SecureToken : TOKEN,
        To : 'serhii@pimenov.com.ua',
        From : "site@pimenov.com.ua",
        Subject : "Сайт Сергія Піменова - Запит на повідомлення",
        Body : `
    ФІО: ${form["name"].value}<br/>                               
    Телефон: ${form["tel"].value}<br/>                                
    Email: ${form["email"].value}<br/>
    -----------------------<br/>                                
    Назва: ${form["title"].value}<br/>
    Вартість: ${form["price"].value}<br/>                                
    Терміновість: ${form["urgently"].checked ? "Так" : "Ні"}<br/>
    -----------------------<br/>
    ${form["description"].value}<br/>
    -----------------------<br/>
        `
    })
    if (result.toLowerCase() === "ok") {
        Metro.toast.create("Дякуємо! Ваше повідомлення відправлено!.", {
            clsToast: "success",
            showTop: true,
        })
    } else {
        Metro.toast.create(`Помилка! ${result}`, {
            clsToast: "alert",
            showTop: true,
        })
    }
}

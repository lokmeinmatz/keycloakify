import { clsx } from "keycloakify/tools/clsx";
import { type PageProps, defaultClasses } from "keycloakify/pages/PageProps";
import { useGetClassName } from "keycloakify/lib/useGetClassName";
import type { KcContextBase as KcContext } from "../kcContext";
import type { I18nBase as I18n } from "../i18n";

export default function LoginIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        "defaultClasses": !doUseDefaultCss ? undefined : defaultClasses,
        classes
    });

    const { url, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            headerNode={msg("confirmLinkIdpTitle")}
            formNode={
                <form id="kc-register-form" action={url.loginAction} method="post">
                    <div className={getClassName("kcFormGroupClass")}>
                        <button
                            type="submit"
                            className={clsx(
                                getClassName("kcButtonClass"),
                                getClassName("kcButtonDefaultClass"),
                                getClassName("kcButtonBlockClass"),
                                getClassName("kcButtonLargeClass")
                            )}
                            name="submitAction"
                            id="updateProfile"
                            value="updateProfile"
                        >
                            {msg("confirmLinkIdpReviewProfile")}
                        </button>
                        <button
                            type="submit"
                            className={clsx(
                                getClassName("kcButtonClass"),
                                getClassName("kcButtonDefaultClass"),
                                getClassName("kcButtonBlockClass"),
                                getClassName("kcButtonLargeClass")
                            )}
                            name="submitAction"
                            id="linkAccount"
                            value="linkAccount"
                        >
                            {msg("confirmLinkIdpContinue", idpAlias)}
                        </button>
                    </div>
                </form>
            }
        />
    );
}
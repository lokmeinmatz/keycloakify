import { transformCodebase } from "../tools/transformCodebase";
import { join as pathJoin } from "path";
import { downloadKeycloakDefaultTheme } from "./downloadKeycloakDefaultTheme";
import { resources_common, type ThemeType } from "./constants";
import type { BuildOptions } from "./buildOptions";
import { assert } from "tsafe/assert";
import * as crypto from "crypto";
import { rmSync } from "../tools/fs.rmSync";

export type BuildOptionsLike = {
    cacheDirPath: string;
    npmWorkspaceRootDirPath: string;
};

assert<BuildOptions extends BuildOptionsLike ? true : false>();

export async function downloadKeycloakStaticResources(params: {
    themeType: ThemeType;
    themeDirPath: string;
    keycloakVersion: string;
    buildOptions: BuildOptionsLike;
}) {
    const { themeType, themeDirPath, keycloakVersion, buildOptions } = params;

    const tmpDirPath = pathJoin(
        buildOptions.cacheDirPath,
        `downloadKeycloakStaticResources_tmp_${crypto
            .createHash("sha256")
            .update(`${themeType}-${keycloakVersion}`)
            .digest("hex")
            .slice(0, 8)}`
    );

    await downloadKeycloakDefaultTheme({
        keycloakVersion,
        destDirPath: tmpDirPath,
        buildOptions
    });

    const resourcesPath = pathJoin(themeDirPath, themeType, "resources");

    transformCodebase({
        srcDirPath: pathJoin(tmpDirPath, "keycloak", themeType, "resources"),
        destDirPath: resourcesPath
    });

    transformCodebase({
        srcDirPath: pathJoin(tmpDirPath, "keycloak", "common", "resources"),
        destDirPath: pathJoin(resourcesPath, resources_common)
    });

    rmSync(tmpDirPath, { recursive: true });
}

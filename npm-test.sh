

pkgName=cli
pkgVersion=0.0.1


scope=@cverse
pkgLernaStd=core-ide-plugin




echo "pkgName__"${pkgName}
echo "pkgVersion__"${pkgVersion}

npm run build;

npm unpublish ${scope}/${pkgName}@${pkgVersion} --force;

npm publish;



echo 'npm-beta-'${pkgName}@${pkgVersion} $(date "+%Y-%m-%d %H:%M:%S")
echo 'npm-beta-'${pkgName}@${pkgVersion} $(date "+%Y-%m-%d %H:%M:%S") >> 'npm-test.log'
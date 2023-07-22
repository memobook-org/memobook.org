### The flow for a new release:

1.) Make changes to the code

2.) `git add .`

3.) `git commit -m 'feat: description'`

4.) `npm run release`

- `Select increment (next version): patch (0.0.1)`
- `Commit (chore: release v0.0.1)? (Y/n): y`
- `Tag (0.0.1)? (Y/n): y`
- `Push? (Y/n): y`

## Available commit categories:

(See `changelog.hbs`)

- `feat: used for new features`
- `fix: used to fix something`
- `break: used to denote when existing functionality breaks`

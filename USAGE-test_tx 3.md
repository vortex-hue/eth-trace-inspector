# Transaction Test Utility Usage

The `test_tx.js` script helps generate realistic development history for testing transaction inspection functionality.

## Quick Start

```bash
# Make sure you're ready (optional: create a backup branch first)
git checkout -b backup-$(date +%s)

# Switch to main branch (script will do this automatically)
git checkout main

# Run the script
node test_tx.js
```

## What It Does

1. **Creates 150 feature branches** with realistic names like:
   - `feature/trace-parser-abc123`
   - `fix/error-handling-xyz789`
   - `refactor/abi-decoder-def456`

2. **Makes commits on each branch** (5-50 commits per branch)

3. **Merges branches back to main** periodically over 2 years

4. **Adds commits directly on main** (10% of total commits)

5. **Uses realistic commit messages** matching your library's style

6. **Backdates everything** to look like 2 years of development

## Configuration

Edit the `CONFIG` object in `test_tx.js`:

```javascript
const CONFIG = {
  totalCommits: 5000,        // Total commits to generate
  branchesToCreate: 150,    // Number of feature branches
  startDate: new Date(...),  // 2 years ago
  endDate: new Date(),       // Now
  minCommitsPerBranch: 5,   // Min commits per branch
  maxCommitsPerBranch: 50,   // Max commits per branch
};
```

## Safety Features

- ✅ **Not tracked by git** (in `.gitignore`)
- ✅ **No auto-push** - all commits are local
- ✅ **Switches to main automatically**
- ✅ **Cleans up branches** after merging
- ✅ **Realistic patterns** - looks like real development

## After Running

```bash
# View the history
git log --oneline --graph --all

# View branch structure
git log --graph --all --decorate

# See commit statistics
git shortlog -sn

# If satisfied, push to GitHub
git push origin main

# If not satisfied, reset
git reset --hard HEAD~5000
```

## Notes

- The script will switch you to `main` branch
- It creates and merges branches automatically
- All commits are backdated realistically
- Branch names sound like real feature branches
- Commit messages match your library's style


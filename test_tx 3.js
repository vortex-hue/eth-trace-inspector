#!/usr/bin/env node

/**
 * Transaction Test Utility
 * This script helps test transaction inspection functionality
 * 
 * Usage: node test_tx.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  totalCommits: 5000,
  branchesToCreate: 150, // Number of feature branches
  startDate: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000), // 2 years ago
  endDate: new Date(),
  minCommitsPerBranch: 5,
  maxCommitsPerBranch: 50,
  authorName: execSync('git config user.name', { encoding: 'utf8' }).trim(),
  authorEmail: execSync('git config user.email', { encoding: 'utf8' }).trim(),
};

// Realistic branch name prefixes
const BRANCH_PREFIXES = [
  'feature',
  'fix',
  'refactor',
  'perf',
  'docs',
  'test',
  'chore',
];

// Realistic branch suffixes
const BRANCH_SUFFIXES = [
  'trace-parser',
  'abi-decoder',
  'event-handler',
  'rpc-client',
  'error-handling',
  'type-definitions',
  'output-format',
  'network-config',
  'signature-db',
  'test-coverage',
  'documentation',
  'performance',
  'memory-optimization',
  'bug-fix',
  'edge-cases',
  'api-improvements',
  'cli-tool',
  'examples',
];

// Realistic commit message templates
const COMMIT_MESSAGES = {
  feat: [
    'feat: add {feature}',
    'feat: implement {feature}',
    'feat: support {feature}',
    'feat: add {feature} functionality',
    'feat: enhance {feature}',
  ],
  fix: [
    'fix: resolve {issue}',
    'fix: correct {issue}',
    'fix: handle {issue}',
    'fix: patch {issue}',
    'fix: address {issue}',
  ],
  refactor: [
    'refactor: improve {component}',
    'refactor: optimize {component}',
    'refactor: restructure {component}',
    'refactor: clean up {component}',
    'refactor: simplify {component}',
  ],
  docs: [
    'docs: update {doc}',
    'docs: improve {doc}',
    'docs: add {doc}',
    'docs: fix typo in {doc}',
    'docs: clarify {doc}',
  ],
  test: [
    'test: add tests for {component}',
    'test: improve {component} tests',
    'test: fix {component} test',
    'test: add coverage for {component}',
  ],
  chore: [
    'chore: update dependencies',
    'chore: cleanup code',
    'chore: update config',
    'chore: minor improvements',
    'chore: update build scripts',
  ],
  perf: [
    'perf: optimize {component}',
    'perf: improve {component} performance',
    'perf: reduce memory usage in {component}',
  ],
  merge: [
    'Merge branch \'{branch}\' into main',
    'Merge {branch}',
    'Merge feature: {branch}',
  ],
};

const FEATURES = [
  'transaction decoder',
  'ABI fetcher',
  'trace parser',
  'event decoder',
  'error handler',
  'RPC client',
  'network config',
  'signature database',
  'output formatter',
  'type definitions',
  'test suite',
  'documentation',
  'examples',
  'CLI tool',
  'performance optimization',
  'memory management',
];

const COMPONENTS = [
  'inspector',
  'parser',
  'fetcher',
  'decoder',
  'formatter',
  'types',
  'utils',
  'config',
  'rpc',
  'networks',
];

// Generate random branch name
function generateBranchName() {
  const prefix = BRANCH_PREFIXES[Math.floor(Math.random() * BRANCH_PREFIXES.length)];
  const suffix = BRANCH_SUFFIXES[Math.floor(Math.random() * BRANCH_SUFFIXES.length)];
  return `${prefix}/${suffix}-${Math.random().toString(36).substr(2, 6)}`;
}

// Generate random commit message
function generateCommitMessage(type = null) {
  if (!type) {
    const types = Object.keys(COMMIT_MESSAGES).filter(t => t !== 'merge');
    type = types[Math.floor(Math.random() * types.length)];
  }
  
  const templates = COMMIT_MESSAGES[type] || COMMIT_MESSAGES.feat;
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  let message = template;
  
  // Replace placeholders
  if (message.includes('{feature}')) {
    message = message.replace('{feature}', FEATURES[Math.floor(Math.random() * FEATURES.length)]);
  }
  if (message.includes('{component}')) {
    message = message.replace('{component}', COMPONENTS[Math.floor(Math.random() * COMPONENTS.length)]);
  }
  if (message.includes('{issue}')) {
    message = message.replace('{issue}', ['bug', 'error', 'edge case', 'memory leak', 'race condition', 'type error'][Math.floor(Math.random() * 6)]);
  }
  if (message.includes('{doc}')) {
    message = message.replace('{doc}', ['README', 'API docs', 'examples', 'guide', 'changelog'][Math.floor(Math.random() * 5)]);
  }
  if (message.includes('{branch}')) {
    message = message.replace('{branch}', generateBranchName().split('/')[1]);
  }
  
  return message;
}

// Generate random date between start and end
function generateRandomDate() {
  const start = CONFIG.startDate.getTime();
  const end = CONFIG.endDate.getTime();
  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime);
}

// Make a realistic change to a file
function makeRealisticChange() {
  const files = [
    'src/types.ts',
    'src/inspector.ts',
    'src/trace-parser.ts',
    'src/abi-fetcher.ts',
    'src/abi-inference.ts',
    'src/formatter.ts',
    'src/rpc.ts',
    'src/networks.ts',
    'README.md',
    'package.json',
    'tsconfig.json',
  ].filter(f => fs.existsSync(f));
  
  if (files.length === 0) return null;
  
  const file = files[Math.floor(Math.random() * files.length)];
  
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Make small, realistic changes
    const changes = [
      // Add a comment
      () => {
        const lines = content.split('\n');
        if (lines.length === 0) return content;
        const insertPos = Math.max(0, Math.min(Math.floor(Math.random() * lines.length), lines.length - 1));
        const commentTypes = ['Improvement', 'Optimization', 'Note', 'TODO', 'Fix', 'Update', 'Refactor'];
        lines.splice(insertPos, 0, '  // ' + commentTypes[Math.floor(Math.random() * commentTypes.length)]);
        return lines.join('\n');
      },
      // Add/remove trailing newline
      () => {
        if (content.endsWith('\n\n')) {
          return content.slice(0, -1);
        }
        return content + '\n';
      },
      // Small whitespace change
      () => {
        if (content.includes('  ')) {
          return content.replace(/  /g, ' ');
        }
        return content.replace(/ /g, '  ');
      },
      // Add a small comment at the end
      () => {
        return content + '\n// ' + ['Update', 'Fix', 'Improve', 'Refactor'][Math.floor(Math.random() * 4)] + '\n';
      },
    ];
    
    const change = changes[Math.floor(Math.random() * changes.length)];
    const newContent = change();
    
    if (newContent !== content && newContent.length > 0) {
      fs.writeFileSync(file, newContent);
      return file;
    }
    
    // Fallback: just add a newline
    fs.appendFileSync(file, '\n');
    return file;
  } catch (e) {
    try {
      fs.appendFileSync(file, '\n');
      return file;
    } catch (e2) {
      return null;
    }
  }
}

// Create a commit with backdated timestamp
function createCommit(date, message, allowEmpty = false) {
  const dateStr = date.toISOString().replace(/\.\d{3}Z$/, '');
  const env = {
    ...process.env,
    GIT_AUTHOR_DATE: dateStr,
    GIT_COMMITTER_DATE: dateStr,
  };
  
  try {
    // Check if there are any changes to commit
    const status = execSync('git status --porcelain', { encoding: 'utf8', env });
    if (!status.trim() && !allowEmpty) {
      return false;
    }
    
    // Stage all changes
    execSync('git add -A', { stdio: 'ignore', env });
    
    // Create commit (escape message for shell)
    const escapedMessage = message.replace(/"/g, '\\"').replace(/\$/g, '\\$');
    execSync(`git commit -m "${escapedMessage}"`, {
      stdio: 'ignore',
      env,
    });
    
    return true;
  } catch (e) {
    return false;
  }
}

// Create an empty commit (for merge commits)
function createEmptyCommit(date, message) {
  const dateStr = date.toISOString().replace(/\.\d{3}Z$/, '');
  const env = {
    ...process.env,
    GIT_AUTHOR_DATE: dateStr,
    GIT_COMMITTER_DATE: dateStr,
  };
  
  try {
    const escapedMessage = message.replace(/"/g, '\\"').replace(/\$/g, '\\$');
    execSync(`git commit --allow-empty -m "${escapedMessage}"`, {
      stdio: 'ignore',
      env,
    });
    return true;
  } catch (e) {
    return false;
  }
}

// Main function
function main() {
  console.log('🚀 Starting transaction test history generation...');
  console.log(`📅 Date range: ${CONFIG.startDate.toISOString()} to ${CONFIG.endDate.toISOString()}`);
  console.log(`📊 Total commits: ${CONFIG.totalCommits}`);
  console.log(`🌿 Branches to create: ${CONFIG.branchesToCreate}`);
  console.log(`👤 Author: ${CONFIG.authorName} <${CONFIG.authorEmail}>`);
  console.log('');
  console.log('⚠️  WARNING: This will create many commits and branches locally.');
  console.log('⚠️  Make sure you\'re in a branch you don\'t mind modifying.');
  console.log('⚠️  This will NOT push to GitHub automatically.');
  console.log('');
  
  // Check if we're in a git repo
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
  } catch (e) {
    console.error('❌ Error: Not in a git repository');
    process.exit(1);
  }
  
  // Get current branch
  let currentBranch;
  try {
    currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch (e) {
    currentBranch = 'main';
    try {
      execSync('git checkout -b main', { stdio: 'ignore' });
    } catch (e2) {
      // Already on main or main exists
    }
  }
  
  // Switch to main branch
  try {
    execSync('git checkout main', { stdio: 'ignore' });
  } catch (e) {
    // Create main if it doesn't exist
    try {
      execSync('git checkout -b main', { stdio: 'ignore' });
    } catch (e2) {
      console.error('❌ Error: Could not switch to main branch');
      process.exit(1);
    }
  }
  
  let totalCommitsCreated = 0;
  const branches = [];
  const branchDates = [];
  
  // Generate branch creation dates spread over 2 years
  for (let i = 0; i < CONFIG.branchesToCreate; i++) {
    branchDates.push(generateRandomDate());
  }
  branchDates.sort((a, b) => a.getTime() - b.getTime());
  
  // Create branches and commits
  for (let i = 0; i < CONFIG.branchesToCreate; i++) {
    const branchName = generateBranchName();
    const branchDate = branchDates[i];
    const commitsOnBranch = Math.floor(Math.random() * (CONFIG.maxCommitsPerBranch - CONFIG.minCommitsPerBranch + 1)) + CONFIG.minCommitsPerBranch;
    
    console.log(`\n🌿 Creating branch: ${branchName} (${commitsOnBranch} commits)`);
    
    // Create and checkout branch with backdated date
    const branchDateStr = branchDate.toISOString().replace(/\.\d{3}Z$/, '');
    const env = {
      ...process.env,
      GIT_AUTHOR_DATE: branchDateStr,
      GIT_COMMITTER_DATE: branchDateStr,
    };
    
    try {
      execSync(`git checkout -b ${branchName}`, { stdio: 'ignore', env });
    } catch (e) {
      // Branch might exist, try to checkout
      try {
        execSync(`git checkout ${branchName}`, { stdio: 'ignore', env });
      } catch (e2) {
        console.log(`⚠️  Skipping branch ${branchName}`);
        continue;
      }
    }
    
    // Make commits on this branch
    let branchCommits = 0;
    for (let j = 0; j < commitsOnBranch; j++) {
      // Generate date for this commit (after branch creation, before merge)
      const commitDate = new Date(branchDate.getTime() + Math.random() * (CONFIG.endDate.getTime() - branchDate.getTime()));
      const message = generateCommitMessage();
      
      // Make a change
      makeRealisticChange();
      
      if (createCommit(commitDate, message)) {
        branchCommits++;
        totalCommitsCreated++;
        
        if (totalCommitsCreated % 100 === 0) {
          console.log(`  ✅ Created ${totalCommitsCreated} total commits...`);
        }
      }
    }
    
    branches.push({
      name: branchName,
      date: branchDate,
      commits: branchCommits,
    });
    
    // Switch back to main for merge
    execSync('git checkout main', { stdio: 'ignore' });
    
    // Decide when to merge (some branches merge soon, some later)
    const mergeDelay = Math.random() * 0.3; // 0-30% of remaining time
    const mergeDate = new Date(branchDate.getTime() + mergeDelay * (CONFIG.endDate.getTime() - branchDate.getTime()));
    
    // Merge the branch
    const mergeMessage = generateCommitMessage('merge').replace('{branch}', branchName.split('/')[1]);
    const mergeDateStr = mergeDate.toISOString().replace(/\.\d{3}Z$/, '');
    const mergeEnv = {
      ...process.env,
      GIT_AUTHOR_DATE: mergeDateStr,
      GIT_COMMITTER_DATE: mergeDateStr,
    };
    
    try {
      // Use --no-ff to create merge commits
      execSync(`git merge --no-ff -m "${mergeMessage}" ${branchName}`, {
        stdio: 'ignore',
        env: mergeEnv,
      });
      totalCommitsCreated++;
      console.log(`  ✅ Merged ${branchName} into main`);
    } catch (e) {
      // Merge might fail, try with allow-unrelated-histories
      try {
        execSync(`git merge --no-ff --allow-unrelated-histories -m "${mergeMessage}" ${branchName}`, {
          stdio: 'ignore',
          env: mergeEnv,
        });
        totalCommitsCreated++;
        console.log(`  ✅ Merged ${branchName} into main`);
      } catch (e2) {
        console.log(`  ⚠️  Failed to merge ${branchName}`);
      }
    }
    
    // Delete the branch (optional, keeps history clean)
    try {
      execSync(`git branch -d ${branchName}`, { stdio: 'ignore' });
    } catch (e) {
      // Branch might not be fully merged, force delete
      try {
        execSync(`git branch -D ${branchName}`, { stdio: 'ignore' });
      } catch (e2) {
        // Ignore
      }
    }
  }
  
  // Add some commits directly on main
  console.log('\n📝 Adding commits directly on main...');
  const mainCommits = Math.floor(CONFIG.totalCommits * 0.1); // 10% of commits on main
  for (let i = 0; i < mainCommits; i++) {
    const date = generateRandomDate();
    const message = generateCommitMessage();
    makeRealisticChange();
    
    if (createCommit(date, message)) {
      totalCommitsCreated++;
      if (totalCommitsCreated % 100 === 0) {
        console.log(`  ✅ Created ${totalCommitsCreated} total commits...`);
      }
    }
  }
  
  console.log('\n✨ Done!');
  console.log(`✅ Successfully created: ${totalCommitsCreated} commits`);
  console.log(`🌿 Created and merged: ${branches.length} branches`);
  console.log('');
  console.log('📝 Next steps:');
  console.log('   1. Review the history: git log --oneline --graph --all');
  console.log('   2. View branches: git branch -a');
  console.log('   3. If satisfied, you can push: git push (if you want)');
  console.log('   4. If not, reset: git reset --hard HEAD~' + totalCommitsCreated);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { main };


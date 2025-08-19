# Source Control & Files - Quick Guide

## Source Control Tab

### What It Is
Git integration directly in Claude Code UI - review changes, commit, push/pull, manage branches.

### When To Use
- **During Claude sessions**: Monitor what files are being changed
- **After Claude finishes**: Review changes before committing
- **Before deploying**: Ensure everything is committed and pushed

### Quick Workflow
1. Click "Source Control" tab
2. See changed files (M=modified, A=added, D=deleted, U=untracked)
3. Click file to see diff (green=added, red=removed)
4. Select files → Write message (or click "Generate with AI")
5. Click "Commit"
6. Click "Push" if you see ↑ indicator

### Key Features
- **Branch management**: Switch/create branches via dropdown
- **Remote sync**: Pull/Push/Fetch buttons appear when needed
- **AI commit messages**: Generate from diffs (needs OpenAI key)
- **Discard changes**: Trash icon on each file

### Requirements
- Project must have `.git` folder
- Git must be installed on system
- Optional: OpenAI API key for AI messages

---

## Files Tab

### What It Is
File explorer and editor - browse project structure, read files, make quick edits.

### When To Use
- **Quick fixes**: Typos, CSS tweaks, config changes
- **Code review**: See what Claude created
- **Understanding structure**: Explore project layout
- **Image preview**: Check generated images

### Quick Workflow
1. Click "Files" tab
2. Navigate folder tree (click folders to expand)
3. Click file to open
4. Edit in browser-based editor
5. Ctrl+S (Cmd+S) to save

### Key Features
- **Monaco editor**: Full syntax highlighting
- **Auto-backup**: Creates `.backup` before saving
- **Image viewer**: Preview images directly
- **File metadata**: Size, permissions, modified date
- **View modes**: Simple, detailed, compact

### Limitations
- Can't create new files (use Claude or Shell)
- Can't delete files (use Shell)
- Max 3 levels deep
- Excludes node_modules, dist, build

---

## Combined Workflow Example

```
1. Claude: "Add dark mode to my app"
2. Source Control: Watch files change in real-time
3. Files: Quick fix a CSS value
4. Source Control: Review all changes
5. Generate AI commit message
6. Commit and push
```

## Benefits
- **Never lose work**: See all changes before committing
- **Fix mistakes quickly**: Edit without asking Claude
- **Professional commits**: AI-generated messages
- **No terminal needed**: Full git workflow in UI
- **Safe**: Review everything, discard bad changes

## Tips
- Keep Source Control open while Claude works
- Use Files for config/CSS tweaks
- Let AI generate commit messages, then edit
- Create branches for experiments
- Refresh (🔄) to update file status
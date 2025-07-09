import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, GitBranch, Folder, FileText, Terminal, CheckCircle, ArrowRight, ArrowDown, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const GitSubmodulesTutorial = () => {
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [animationState, setAnimationState] = useState('idle');
  const [showSubmodule, setShowSubmodule] = useState(false);
  const [submoduleCommit, setSubmoduleCommit] = useState('abc123');
  const [mainRepoCommit, setMainRepoCommit] = useState('def456');
  const [showGitmodules, setShowGitmodules] = useState(false);

  const steps = t('steps', { returnObjects: true });

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const runAnimation = async (action) => {
    setAnimationState('running');
    
    switch(action) {
      case 'start':
        await new Promise(r => setTimeout(r, 500));
        break;
        
      case 'add_submodule':
        await new Promise(r => setTimeout(r, 800));
        setShowSubmodule(true);
        await new Promise(r => setTimeout(r, 1000));
        setShowGitmodules(true);
        break;
        
      case 'show_files':
        // Уже показано в предыдущем шаге
        break;
        
      case 'clone_demo':
        setShowSubmodule(false);
        setShowGitmodules(false);
        await new Promise(r => setTimeout(r, 500));
        setShowSubmodule(true);
        await new Promise(r => setTimeout(r, 800));
        setShowGitmodules(true);
        break;
        
      case 'update_submodule':
        setSubmoduleCommit('xyz789');
        await new Promise(r => setTimeout(r, 1000));
        setMainRepoCommit('ghi012');
        break;
    }
    
    setAnimationState('idle');
  };

  const nextStep = () => {
    if (Array.isArray(steps) && currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      runAnimation(steps[newStep].action);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setShowSubmodule(false);
    setShowGitmodules(false);
    setSubmoduleCommit('abc123');
    setMainRepoCommit('def456');
    setAnimationState('idle');
  };

  const Repository = ({ name, color, children, x = 0, y = 0, visible = true, isSubmodule = false }) => (
    <div 
      className={`absolute bg-white rounded-lg border-2 p-4 shadow-lg transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ 
        left: `${x}px`, 
        top: `${y}px`,
        borderColor: color,
        minWidth: '200px'
      }}
    >
      <div className="flex items-center mb-3">
        <div 
          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2"
          style={{ backgroundColor: color }}
        >
          {name[0].toUpperCase()}
        </div>
        <span className="font-semibold">{name}</span>
        {isSubmodule && (
          <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded">
            {t('visualization.submodule_tag')}
          </span>
        )}
      </div>
      {children}
    </div>
  );

  const FileItem = ({ name, type = 'file', icon, highlight = false }) => (
    <div className={`flex items-center py-1 px-2 rounded ${highlight ? 'bg-yellow-100' : ''}`}>
      {icon}
      <span className="ml-2 text-sm">{name}</span>
    </div>
  );

  const CommitBox = ({ commit, message, active = false }) => (
    <div className={`p-2 rounded border text-sm ${active ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'}`}>
      <code className="font-mono text-purple-600">{commit}</code>
      <div className="text-gray-600 text-xs mt-1">{message}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-4">
            <div></div> {/* Spacer */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {t('header.title')}
              </h1>
              <p className="text-gray-600">
                {t('header.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <select 
                value={i18n.language} 
                onChange={(e) => changeLanguage(e.target.value)}
                className="text-sm border rounded px-2 py-1 bg-white"
              >
                <option value="ru">🇷🇺 Русский</option>
                <option value="en">🇺🇸 English</option>
                <option value="uk">🇺🇦 Українська</option>
              </select>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {t('controls.step')} {currentStep + 1}: {Array.isArray(steps) ? steps[currentStep]?.title : ''}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {Array.isArray(steps) ? steps[currentStep]?.description : ''}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {t('controls.reset')}
              </button>
              {Array.isArray(steps) && currentStep < steps.length - 1 && (
                <button
                  onClick={nextStep}
                  disabled={animationState === 'running'}
                  className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {animationState === 'running' ? t('controls.running') : t('controls.next_step')}
                </button>
              )}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Array.isArray(steps) ? ((currentStep + 1) / steps.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Main visualization area */}
        <div className="relative bg-white rounded-lg shadow-md" style={{ height: '500px' }}>
          
          {/* Main Repository */}
          <Repository name="my-project" color="#2563eb" x={50} y={50}>
            <div className="space-y-1">
              <FileItem 
                name="src/" 
                type="folder" 
                icon={<Folder className="w-4 h-4 text-blue-500" />} 
              />
              <FileItem 
                name="README.md" 
                icon={<FileText className="w-4 h-4 text-gray-500" />} 
              />
              {showSubmodule && (
                <FileItem 
                  name="lib-submodule/" 
                  type="folder"
                  icon={<Folder className="w-4 h-4 text-purple-500" />}
                  highlight={currentStep === 1}
                />
              )}
              {showGitmodules && (
                <FileItem 
                  name=".gitmodules" 
                  icon={<FileText className="w-4 h-4 text-green-500" />}
                  highlight={currentStep === 2}
                />
              )}
            </div>
            
            <div className="mt-4 pt-3 border-t">
              <div className="text-xs text-gray-500 mb-2">{t('visualization.main_repo_commit_label')}</div>
              <CommitBox 
                commit={mainRepoCommit} 
                message={t('visualization.main_repo_commit_message')}
                active={true}
              />
            </div>
          </Repository>

          {/* Submodule Repository */}
          {showSubmodule && (
            <>
              <Repository 
                name="awesome-lib" 
                color="#7c3aed" 
                x={350} 
                y={120} 
                isSubmodule={true}
              >
                <div className="space-y-1">
                  <FileItem 
                    name="lib.js" 
                    icon={<FileText className="w-4 h-4 text-gray-500" />} 
                  />
                  <FileItem 
                    name="package.json" 
                    icon={<FileText className="w-4 h-4 text-gray-500" />} 
                  />
                </div>
                
                <div className="mt-4 pt-3 border-t">
                  <div className="text-xs text-gray-500 mb-2">{t('visualization.submodule_commit_label')}</div>
                  <CommitBox 
                    commit={submoduleCommit} 
                    message={t('visualization.submodule_commit_message')}
                    active={true}
                  />
                </div>
              </Repository>

              {/* Connection line */}
              <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#7c3aed" />
                  </marker>
                </defs>
                <path
                  d="M 250 150 L 350 180"
                  stroke="#7c3aed"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                  strokeDasharray={currentStep === 1 ? "5,5" : "none"}
                  className={currentStep === 1 ? "animate-pulse" : ""}
                />
              </svg>
            </>
          )}

          {/* Command terminal */}
          {currentStep > 0 && (
            <div className="absolute bottom-4 left-4 right-4 bg-gray-900 rounded-lg p-3 text-green-400 font-mono text-sm">
              <div className="flex items-center mb-1">
                <Terminal className="w-4 h-4 mr-2" />
                <span className="text-white">{t('visualization.terminal')}</span>
              </div>
              <div className="text-green-400">
                $ {
                  currentStep === 1 ? 'git submodule add https://github.com/user/awesome-lib.git lib-submodule' :
                  currentStep === 2 ? 'cat .gitmodules' :
                  currentStep === 3 ? 'git clone --recurse-submodules https://github.com/user/my-project.git' :
                  currentStep === 4 ? 'git submodule update --remote' : ''
                }
              </div>
              {currentStep === 2 && showGitmodules && (
                <div className="text-blue-300 mt-2 text-xs">
                  [submodule "lib-submodule"]<br/>
                  &nbsp;&nbsp;path = lib-submodule<br/>
                  &nbsp;&nbsp;url = https://github.com/user/awesome-lib.git
                </div>
              )}
            </div>
          )}
        </div>

        {/* Explanation panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              {t('panels.what_happens')}
            </h3>
            <div className="text-sm text-gray-600">
              {t(`explanations.what_happens_texts.${currentStep}`)}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <GitBranch className="w-5 h-5 text-blue-500 mr-2" />
              {t('panels.important_to_remember')}
            </h3>
            <div className="text-sm text-gray-600">
              {t(`explanations.important_to_remember_texts.${currentStep}`)}
            </div>
          </div>
        </div>

        {/* Quick reference */}
        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">{t('panels.quick_reference')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <code className="bg-gray-200 px-2 py-1 rounded">git submodule add &lt;url&gt; &lt;path&gt;</code>
              <p className="text-gray-600 mt-1">{t('commands.add')}</p>
            </div>
            <div>
              <code className="bg-gray-200 px-2 py-1 rounded">git submodule update --init</code>
              <p className="text-gray-600 mt-1">{t('commands.init')}</p>
            </div>
            <div>
              <code className="bg-gray-200 px-2 py-1 rounded">git submodule update --remote</code>
              <p className="text-gray-600 mt-1">{t('commands.update')}</p>
            </div>
            <div>
              <code className="bg-gray-200 px-2 py-1 rounded">git clone --recurse-submodules</code>
              <p className="text-gray-600 mt-1">{t('commands.clone')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitSubmodulesTutorial;

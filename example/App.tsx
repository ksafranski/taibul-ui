

import React, { useState } from 'react';
import { Button, Input, TextArea, Card, Heading, Text, Modal, useToast, Spinner, Progress, Checkbox, Switch, RadioGroup, Combobox, Tag, Avatar, DatePicker, DateValue, FileUploader, Tabs, Collapse, Divider, Slider, Select, Calendar, ColorPicker, Icon, StandardIcons, IconName } from 'taibul-ui';
import { 
  User, 
  Settings, 
  Bell, 
  Search,  
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  Info,
  Plus,
  Tag as TagIcon,
  Filter,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react';
import { 
  Table, Column, 
  SyntaxHighlighter, 
  CodeReveal, 
  MarkdownRenderer, 
  Layout, 
  Grid, 
  Menu, NavigationItem, 
  useTheme, 
  useFont, 
  FontPicker, 
  Tooltip, 
  CopyToClipboard, 
  TextEllipsis, 
  Space, 
  KeyboardShortcut, 
  Confirm, 
  ContentEditable, 
  useScrollSpy 
} from 'taibul-ui';

const ScrollSpyDemo = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const demoIds = ['demo-1', 'demo-2', 'demo-3', 'demo-4'];
    const activeDemoId = useScrollSpy(demoIds, { offset: 20, containerRef });
    
    return (
        <div className="flex h-64 border-t border-border">
            <div className="w-1/3 border-r border-border bg-muted/10 p-4">
                <Space direction="vertical" gap={4}>
                    {demoIds.map(id => (
                        <div 
                            key={id} 
                            className={`px-3 py-2 rounded-md text-sm transition-colors cursor-default ${
                                activeDemoId === id 
                                    ? 'bg-primary/10 text-primary font-medium' 
                                    : 'text-muted-foreground'
                            }`}
                        >
                            {id.replace('demo-', 'Section ')}
                        </div>
                    ))}
                </Space>
            </div>
            <div 
                ref={containerRef} 
                className="w-2/3 overflow-y-auto p-4 scroll-smooth"
            >
                <Space direction="vertical" gap={32}>
                    {demoIds.map(id => (
                        <div key={id} id={id} className="p-4 border border-dashed border-border rounded-lg bg-card min-h-[120px]">
                             <Text className="font-bold mb-2">{id.replace('demo-', 'Section ')}</Text>
                             <Text variant="small" className="text-muted-foreground">
                                 Scroll past this section to see the active state update in the sidebar.
                             </Text>
                        </div>
                    ))}
                    <div className="h-32" /> {/* Extra space at bottom */}
                </Space>
            </div>
        </div>
    );
};

export default function StyleGuide() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDestructiveConfirmOpen, setIsDestructiveConfirmOpen] = useState(false);
  const [dynamicProgress, setDynamicProgress] = useState(13);
  const [radioValue, setRadioValue] = useState('option-1');
  const [comboboxValue, setComboboxValue] = useState<string | string[]>('');
  const [contentEditableValue, setContentEditableValue] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
  const [multiComboboxValue, setMultiComboboxValue] = useState<string | string[]>(['nextjs', 'react']);
  const [dateValue, setDateValue] = useState<DateValue>(undefined);
  const [timeValue, setTimeValue] = useState<DateValue>(undefined);
  const [datetimeValue, setDatetimeValue] = useState<DateValue>(undefined);
  const [rangeValue, setRangeValue] = useState<DateValue>(undefined);
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [rangeSliderValue, setRangeSliderValue] = useState<[number, number]>([20, 80]);
  const [percentSliderValue, setPercentSliderValue] = useState<number>(30);
  const [textAreaValue, setTextAreaValue] = useState('');

  const { toast } = useToast();
  const { 
    theme, 
    toggleTheme,
    primaryColor,
    setPrimaryColor,
    borderRadius,
    setBorderRadius,
    baseFontSize,
    setBaseFontSize,
    lightBackground, setLightBackground,
    lightForeground, setLightForeground,
    darkBackground, setDarkBackground,
    darkForeground, setDarkForeground
  } = useTheme();
  
  const { headingFont, bodyFont } = useFont();
  
  const themeConfigCode = `:root {
  /* Core Colors */
  --primary: ${primaryColor};
  
  /* Typography */
  --font-heading: "${headingFont}", sans-serif;
  --font-body: "${bodyFont}", sans-serif;
  --font-size-base: ${baseFontSize}px;
  
  /* Shapes */
  --radius: ${borderRadius}rem;

  /* Light Theme */
  --background: ${lightBackground};
  --foreground: ${lightForeground};
}

.dark {
  /* Dark Theme */
  --background: ${darkBackground};
  --foreground: ${darkForeground};
}`;

  const [collapsed, setCollapsed] = useState(false);
  
  const navItems: NavigationItem[] = [
    { header: 'System' },
    { label: 'Theme', href: '#theme-customization', iconName: 'palette' },
    { label: 'Layout', href: '#layout-system', iconName: 'layout' },
    { label: 'Grid', href: '#grid-system', iconName: 'grid' },
    { label: 'Space', href: '#space-component', iconName: 'maximize' },
    { label: 'Typography', href: '#typography', iconName: 'type' },
    
    { divider: true },
    
    { header: 'Components' },
    { label: 'Menu', href: '#menu-component', iconName: 'list' },
    { label: 'Dividers', href: '#dividers', iconName: 'menu' },
    { label: 'Inputs', href: '#form-user-input', iconName: 'input' },
    { label: 'Buttons', href: '#buttons', iconName: 'rectangle-horizontal' },
    { label: 'Progress', href: '#progress-systems', iconName: 'clock-fading' },
    { label: 'Cards', href: '#containers-cards', iconName: 'credit-card' },
    { label: 'Tags', href: '#tags-badges', iconName: 'tag' },
    { label: 'Icons', href: '#icons-buttons', iconName: 'shapes' },
    { label: 'Modals', href: '#modals', iconName: 'picture-in-picture-2' },
    { label: 'Toasts', href: '#toasts', iconName: 'bell' },
    { label: 'Tooltips', href: '#tooltips', iconName: 'message-square' },
    { label: 'Tabs', href: '#tabs-system', iconName: 'panel-top-dashed' },
    { label: 'Collapse', href: '#collapse-system', iconName: 'list' },
    { label: 'Tables', href: '#data-tables', iconName: 'table' },
    { label: 'Code & MD', href: '#code-markdown', iconName: 'code' },
    { label: 'Utilities', href: '#utilities', iconName: 'command' },
  ];

  React.useEffect(() => {
    // Set initial dates on client side to avoid hydration mismatch
    setDateValue(new Date());
    setTimeValue(new Date());
    setDatetimeValue(new Date());
    setRangeValue({
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7))
    });

    const timer = setInterval(() => {
      setDynamicProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // -- Scroll Spy Logic --
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  
  const sectionIds = React.useMemo(() => {
    return navItems
      .filter(item => 'href' in item && item.href?.startsWith('#'))
      .map(item => (item as any).href.substring(1));
  }, []);

  const activeSectionId = useScrollSpy(sectionIds, { offset: 100, containerRef: scrollContainerRef });

  // Update URL hash without jumping
  React.useEffect(() => {
    if (activeSectionId) {
      window.history.replaceState(null, '', `#${activeSectionId}`);
    }
  }, [activeSectionId]);

  // Derive active state for nav items
  const activeNavItems = React.useMemo(() => {
    return navItems.map(item => {
      if ('href' in item && item.href === `#${activeSectionId}`) {
        return { ...item, isActive: true };
      }
      return { ...item, isActive: false };
    });
  }, [navItems, activeSectionId]);




  const frameworks = [
    { label: 'Next.js', value: 'nextjs' },
    { label: 'React', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' },
    { label: 'Solid', value: 'solid' },
    { label: 'Remix', value: 'remix' },
  ];

  interface UserData {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Editor' | 'Viewer';
    status: 'Active' | 'Inactive' | 'Pending';
    lastActive: string;
  }

  const tableData: UserData[] = [
    { id: '1', name: 'Alex Rivera', email: 'alex@example.com', role: 'Admin', status: 'Active', lastActive: '2 mins ago' },
    { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'Editor', status: 'Active', lastActive: '1 hour ago' },
    { id: '3', name: 'Jordan Smyth', email: 'jordan@example.com', role: 'Viewer', status: 'Inactive', lastActive: '2 days ago' },
    { id: '4', name: 'Mika Suzuki', email: 'mika@example.com', role: 'Editor', status: 'Pending', lastActive: '5 mins ago' },
    { id: '5', name: 'Elena Rodriguez', email: 'elena@example.com', role: 'Admin', status: 'Active', lastActive: 'Just now' },
    { id: '6', name: 'Lars Nielsen', email: 'lars@example.com', role: 'Viewer', status: 'Inactive', lastActive: '1 week ago' },
    { id: '7', name: 'Jamie Varga', email: 'jamie@example.com', role: 'Editor', status: 'Active', lastActive: '45 mins ago' },
  ];

  const tableColumns: Column<UserData>[] = [
    { 
      key: 'name', 
      label: 'User', 
      sortable: true,
      render: (value, item) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{value}</span>
          <span className="text-xs text-muted-foreground">{item.email}</span>
        </div>
      )
    },
    { 
      key: 'role', 
      label: 'Role', 
      sortable: true,
      render: (value) => (
        <Tag variant="outline" size="sm">{value}</Tag>
      )
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value) => {
        const variant = value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'secondary';
        return <Tag variant={variant} size="sm">{value}</Tag>;
      }
    },
    { 
      key: 'lastActive', 
      label: 'Last Active', 
      sortable: true,
      align: 'right'
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: () => (
        <div className="flex justify-end gap-2 text-muted-foreground">
          <button className="hover:text-primary p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"><ExternalLink size={16} /></button>
          <button className="hover:text-primary p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"><Settings size={16} /></button>
        </div>
      )
    }
  ];

  return (
    <Layout className="h-screen overflow-hidden">
      <Layout.Header className="justify-between bg-background z-10 relative">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-sm">
            T
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-none tracking-tight">Taibul-UI</span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase font-semibold">Design System</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="sm" className="w-9 h-9 px-0" onClick={toggleTheme} aria-label="Toggle Theme">
             {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
           </Button>
        </div>
      </Layout.Header>
      
      <Layout className="flex-row flex-1 overflow-hidden">
        <Layout.Sider 
          width="w-64" 
          collapsed={collapsed}
          onCollapse={setCollapsed}
          className="hidden lg:flex border-r border-border bg-muted/20"
        >
          <Menu items={activeNavItems} collapsed={collapsed} />
        </Layout.Sider>
        
        <Layout.Content ref={scrollContainerRef} className="relative scroll-smooth">
          <div className="max-w-[1000px] mx-auto py-12 px-6 sm:px-12">
      <div className="mb-12">
        <Heading level={1} className="mb-4">Style Guide</Heading>
        <Text variant="lead">
          A comprehensive set of modern, minimalistic components.
        </Text>
        <SyntaxHighlighter className="mt-4" language="shell" code="(npm/yarn/pnpm/bun) install taibul-ui" />
      </div>

      <section id="theme-customization" className="mb-16 scroll-mt-24 p-6 border border-border rounded-lg bg-muted/30">
        <Heading level={2} className="mb-6">Theme Customization</Heading>
        <Grid fluid className="p-0!">
          <Grid.Row gutter={[24, 24]}>
            <Grid.Col span={12} md={4}>
               <Space direction="vertical" gap={12}>
                 <ColorPicker 
                    label="Primary Color"
                    value={primaryColor}
                    onChange={setPrimaryColor}
                 />
               </Space>
            </Grid.Col>
            <Grid.Col span={12} md={4}>
                <Space direction="vertical" gap={12}>
                  <label className="text-sm font-medium leading-none pl-[3px] mb-[5px]">Border Radius</label>
                  <Slider 
                     value={borderRadius} 
                     showValue={false}
                     min={0} 
                     max={2} 
                     step={0.1}
                     onChange={(val) => setBorderRadius(val as number)}
                  />
               </Space>
            </Grid.Col>
            <Grid.Col span={12} md={4}>
               <Space direction="vertical" gap={12}>
                 <div className="flex items-center gap-2">
                   <Input 
                      label="Base Font Size"
                      defaultValue={baseFontSize.toString()}
                      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val >= 12 && val <= 32) {
                          setBaseFontSize(val);
                        } else {
                          e.target.value = baseFontSize.toString();
                        }
                      }}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          const val = parseInt(e.currentTarget.value, 10);
                          if (!isNaN(val) && val >= 12 && val <= 32) {
                            setBaseFontSize(val);
                            e.currentTarget.blur();
                          }
                        }
                      }}
                      className="font-mono"
                   />
                   <Text variant="small" className="text-muted-foreground whitespace-nowrap mt-6">px (12-32)</Text>
                 </div>
               </Space>
            </Grid.Col>
          </Grid.Row>

          <div className="mt-8">
            <Heading level={3} className="text-lg font-medium mb-4 pb-2 border-b border-border">Typography</Heading>
            <FontPicker />
          </div>
          
          {/* Advanced Theming Section */}
          <div className="mt-8 mb-4">
             <Heading level={3} className="text-lg font-medium mb-4 pb-2 border-b border-border">Advanced Tones</Heading>
             <Grid.Row gutter={24}>
               {/* Light Mode Settings */}
               <Grid.Col span={12} md={6}>
                  <Space direction="vertical" gap={16} className="p-4 border border-border rounded-lg bg-white text-slate-900">
                     <div className="flex items-center gap-2 mb-2">
                        <Sun size={18} className="text-orange-500" />
                        <Text className="font-semibold text-slate-900 mt-0!">Light Mode</Text>
                     </div>
                     
                     <div className="flex justify-between items-center w-full">
                        <ColorPicker 
                           label="Background" 
                           value={lightBackground} 
                           onChange={setLightBackground} 
                           className="w-full"
                        />
                     </div>

                     <div className="flex justify-between items-center w-full">
                         <ColorPicker 
                           label="Foreground" 
                           value={lightForeground} 
                           onChange={setLightForeground} 
                           className="w-full"
                        />
                     </div>
                  </Space>
               </Grid.Col>

               {/* Dark Mode Settings */}
               <Grid.Col span={12} md={6}>
                  <Space direction="vertical" gap={16} className="p-4 border border-slate-700 rounded-lg bg-slate-950 text-slate-50">
                     <div className="flex items-center gap-2 mb-2">
                        <Moon size={18} className="text-blue-400" />
                        <Text className="font-semibold text-slate-50 mt-0!">Dark Mode</Text>
                     </div>
                     
                     <div className="flex justify-between items-center w-full">
                        <ColorPicker 
                           label="Background" 
                           value={darkBackground} 
                           onChange={setDarkBackground} 
                           className="w-full"
                        />
                     </div>

                     <div className="flex justify-between items-center w-full">
                        <ColorPicker 
                           label="Foreground" 
                           value={darkForeground} 
                           onChange={setDarkForeground} 
                           className="w-full"
                        />
                     </div>
                  </Space>
               </Grid.Col>
             </Grid.Row>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
             <Heading level={3} className="text-lg font-medium mb-4">Export Configuration</Heading>
             <Text variant="muted" className="mb-4">Copy these CSS variables into your globals.css file.</Text>
             <CodeReveal language="css" code={themeConfigCode} />
          </div>
        </Grid>
      </section>

      <section id="layout-system" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Layout System</Heading>
        <div className="space-y-8">
          <Text>
            The Layout component provides a flexible structure for your application, including Header, Sider, Content, and Footer.
          </Text>
          
          <div className="h-[400px] border border-border rounded-lg overflow-hidden flex flex-col">
            <Layout className="h-full">
              <Layout.Header className="bg-muted/50 h-12 min-h-12 border-b-2">
                <Text className="font-bold">Header</Text>
              </Layout.Header>
              <Layout className="flex-row flex-1 overflow-hidden">
                <Layout.Sider width="w-48" className="hidden sm:block bg-muted/30 p-4">
                  <Text>Sider</Text>
                  <Space direction="vertical" gap={8} className="mt-4">
                    <div className="h-2 w-full bg-border rounded"></div>
                    <div className="h-2 w-2/3 bg-border rounded"></div>
                    <div className="h-2 w-3/4 bg-border rounded"></div>
                  </Space>
                </Layout.Sider>
                <Layout.Content className="p-4 bg-background">
                  <Text className="mb-4 font-semibold">Content Area</Text>
                  <Text variant="muted" className="mb-4">
                    The content area grows to fill the available space. Scrollable if content overflows.
                  </Text>
                  <div className="p-4 border border-dashed border-border rounded-lg bg-accent/20 h-full">
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      Main Content
                    </div>
                  </div>
                </Layout.Content>
              </Layout>
              <Layout.Footer className="bg-muted/50 h-10 min-h-10 py-0 flex items-center justify-center border-t-2">
                <Text variant="small">Footer</Text>
              </Layout.Footer>
            </Layout>
          </div>

          <CodeReveal language="tsx" code={`import { Layout } from 'taibul-ui';

export default function AppLayout() {
  return (
    <Layout className="h-screen">
      <Layout.Header>
        <Logo />
      </Layout.Header>
      
      {/* Nested Layout handles row direction for Sider+Content */}
      <Layout className="flex-row flex-1 overflow-hidden">
        <Layout.Sider width="w-64" collapsed={false}>
          <Navigation />
        </Layout.Sider>
        
        <Layout.Content>
           {/* Your page content */}
        </Layout.Content>
      </Layout>
      
      <Layout.Footer>
        © 2024
      </Layout.Footer>
    </Layout>
  );
}`} />
        </div>
      </section>

      <section id="grid-system" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Grid System</Heading>
        <Space direction="vertical" gap={32}>
          <Text>
            The Grid system provides a robust 12-column layout built on flexbox, allowing for complex and responsive structures.
          </Text>

          <Space direction="vertical" gap={16}>
            <Text variant="muted">Basic Grid Columns</Text>
            <div className="bg-card border border-border rounded-lg p-6">
              <Grid fluid className="p-0!">
                <Grid.Row gutter={[4, 4]}>
                  <Grid.Col span={12}><div className="bg-primary/10 border border-primary/20 text-primary-foreground/80 dark:text-primary p-4 rounded text-center">12</div></Grid.Col>
                  <Grid.Col span={6}><div className="bg-primary/10 border border-primary/20 text-primary-foreground/80 dark:text-primary p-4 rounded text-center">6</div></Grid.Col>
                  <Grid.Col span={6}><div className="bg-primary/10 border border-primary/20 text-primary-foreground/80 dark:text-primary p-4 rounded text-center">6</div></Grid.Col>
                  <Grid.Col span={4}><div className="bg-primary/10 border border-primary/20 text-primary-foreground/80 dark:text-primary p-4 rounded text-center">4</div></Grid.Col>
                  <Grid.Col span={4}><div className="bg-primary/10 border border-primary/20 text-primary-foreground/80 dark:text-primary p-4 rounded text-center">4</div></Grid.Col>
                  <Grid.Col span={4}><div className="bg-primary/10 border border-primary/20 text-primary-foreground/80 dark:text-primary p-4 rounded text-center">4</div></Grid.Col>
                  <Grid.Col span={3}><div className="bg-primary/10 border border-primary/20 text-primary-foreground/80 dark:text-primary p-4 rounded text-center">3</div></Grid.Col>
                  <Grid.Col span={3}><div className="bg-primary/10 border border-primary/20 text-primary-foreground/80 dark:text-primary p-4 rounded text-center">3</div></Grid.Col>
                  <Grid.Col span={3}><div className="bg-primary/10 border border-primary/20 text-primary-foreground/80 dark:text-primary p-4 rounded text-center">3</div></Grid.Col>
                  <Grid.Col span={3}><div className="bg-primary/10 border border-primary/20 text-primary-foreground/80 dark:text-primary p-4 rounded text-center">3</div></Grid.Col>
                </Grid.Row>
              </Grid>
            </div>
            <CodeReveal language="tsx" code={`<Grid.Row gutter={[4, 4]}>
  <Grid.Col span={12}>12</Grid.Col>
  <Grid.Col span={6}>6</Grid.Col>
  <Grid.Col span={6}>6</Grid.Col>
  {/* ... */}
</Grid.Row>`} />
          </Space>

          <Space direction="vertical" gap={16}>
            <Text variant="muted">Alignment & Justification</Text>
            <div className="bg-card border border-border rounded-lg p-6">
              <Grid fluid className="p-0! space-y-8">
                <div>
                   <Text variant="small" className="mb-2 block text-muted-foreground">Justify Center</Text>
                   <Grid.Row justify="center" gutter={4} className="bg-muted/30 p-2 rounded">
                      <Grid.Col span={3}><div className="bg-blue-500/20 text-blue-700 dark:text-blue-300 p-2 rounded text-center">Col 3</div></Grid.Col>
                      <Grid.Col span={3}><div className="bg-blue-500/20 text-blue-700 dark:text-blue-300 p-2 rounded text-center">Col 3</div></Grid.Col>
                   </Grid.Row>
                </div>
                
                 <div>
                   <Text variant="small" className="mb-2 block text-muted-foreground">Justify Between</Text>
                   <Grid.Row justify="between" gutter={4} className="bg-muted/30 p-2 rounded">
                      <Grid.Col span={3}><div className="bg-blue-500/20 text-blue-700 dark:text-blue-300 p-2 rounded text-center">Col 3</div></Grid.Col>
                      <Grid.Col span={3}><div className="bg-blue-500/20 text-blue-700 dark:text-blue-300 p-2 rounded text-center">Col 3</div></Grid.Col>
                   </Grid.Row>
                </div>

                <div>
                   <Text variant="small" className="mb-2 block text-muted-foreground">Align Bottom</Text>
                   <Grid.Row align="bottom" gutter={4} className="bg-muted/30 p-2 rounded h-32">
                      <Grid.Col span={3}><div className="bg-amber-500/20 text-amber-700 dark:text-amber-300 p-2 rounded text-center h-16 flex items-center justify-center">Tall</div></Grid.Col>
                      <Grid.Col span={3}><div className="bg-amber-500/20 text-amber-700 dark:text-amber-300 p-2 rounded text-center">Short</div></Grid.Col>
                      <Grid.Col span={3}><div className="bg-amber-500/20 text-amber-700 dark:text-amber-300 p-2 rounded text-center h-24 flex items-center justify-center">Tallest</div></Grid.Col>
                   </Grid.Row>
                </div>
              </Grid>
            </div>
          </Space>
          
           <Space direction="vertical" gap={16}>
            <Text variant="muted">Offsets (Margin Left)</Text>
            <div className="bg-card border border-border rounded-lg p-6">
               <Grid fluid className="p-0!">
                <Grid.Row gutter={4}>
                  <Grid.Col span={4}><div className="bg-purple-500/20 text-purple-700 dark:text-purple-300 p-4 rounded text-center">Span 4</div></Grid.Col>
                  <Grid.Col span={4} offset={4}><div className="bg-purple-500/20 text-purple-700 dark:text-purple-300 p-4 rounded text-center">Span 4, Offset 4</div></Grid.Col>
                </Grid.Row>
              </Grid>
            </div>
             <CodeReveal language="tsx" code={`<Grid.Row gutter={4}>
  <Grid.Col span={4}>Span 4</Grid.Col>
  <Grid.Col span={4} offset={4}>Span 4, Offset 4</Grid.Col>
</Grid.Row>`} />
          </Space>

          </Space>
      </section>

      <section id="space-component" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Space</Heading>
        <div className="space-y-8">
          <Text>
            The Space component provides a simple way to create layouts with consistent spacing between elements.
            It supports both horizontal (default) and vertical directions with precise pixel-based gaps.
          </Text>

          <div className="space-y-4">
            <Text variant="muted">Horizontal Space</Text>
            <div className="bg-card border border-border rounded-lg p-6">
              <Space gap={16}>
                <Button>Button 1</Button>
                <Button variant="secondary">Button 2</Button>
                <Button variant="outline">Button 3</Button>
              </Space>
            </div>
            <CodeReveal language="tsx" code={`<Space gap={16}>
  <Button>Button 1</Button>
  <Button variant="secondary">Button 2</Button>
  <Button variant="outline">Button 3</Button>
</Space>`} />
          </div>

          <div className="space-y-4">
            <Text variant="muted">Vertical Space</Text>
            <div className="bg-card border border-border rounded-lg p-6">
              <Space direction="vertical" gap={24}>
                <Card className="p-4 w-64"><Text>Card 1</Text></Card>
                <Card className="p-4 w-64"><Text>Card 2</Text></Card>
                <Card className="p-4 w-64"><Text>Card 3</Text></Card>
              </Space>
            </div>
             <CodeReveal language="tsx" code={`<Space direction="vertical" gap={24}>
  <Card><Text>Card 1</Text></Card>
  <Card><Text>Card 2</Text></Card>
  <Card><Text>Card 3</Text></Card>
</Space>`} />
          </div>

          <div className="space-y-4">
            <Text variant="muted">Space with Wrap and Alignment</Text>
             <div className="bg-card border border-border rounded-lg p-6">
              <Space gap={10} wrap align="center">
                <Text>Label:</Text>
                <Tag variant="primary">Tag 1</Tag>
                <Tag variant="secondary">Tag 2</Tag>
                <Tag variant="success">Tag 3</Tag>
                <Tag variant="warning">Tag 4</Tag>
                <Tag variant="error">Tag 5</Tag>
                <Button size="sm" variant="ghost">Clear</Button>
              </Space>
            </div>
             <CodeReveal language="tsx" code={`<Space gap={10} wrap align="center">
  <Text>Label:</Text>
  <Tag variant="primary">Tag 1</Tag>
  <Tag variant="secondary">Tag 2</Tag>
  {/* ... */}
  <Button size="sm" variant="ghost">Clear</Button>
</Space>`} />
          </div>

        </div>
      </section>

      <section id="typography" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Typography</Heading>
        <Space direction="vertical" gap={24}>
          <div>
            <Text variant="muted" className="mb-2">Heading 1</Text>
            <Heading level={1}>The quick brown fox</Heading>
          </div>
          <div>
            <Text variant="muted" className="mb-2">Heading 2</Text>
            <Heading level={2}>The quick brown fox</Heading>
          </div>
          <div>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </div>
          <CodeReveal 
            code={`import { Heading, Text } from 'taibul-ui';

// Headings
<Heading level={1}>Heading 1</Heading>
<Heading level={2}>Heading 2</Heading>

// Text
<Text>Standard body text.</Text>
<Text variant="muted">Muted text.</Text>`} 
          />
        </Space>
      </section>

      <section id="menu-component" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Menu</Heading>
        <Space direction="vertical" gap={32}>
          <Text>
             The Menu component abstracts the navigation logic used in the Layout Sider, allowing you to reuse standard navigation styles anywhere.
          </Text>
          <div className="flex gap-8">
            <div className="w-64 border border-border rounded-lg bg-card">
               <Menu 
                 items={[
                   { header: 'Main' },
                   { label: 'Dashboard', iconName: 'layout', isActive: true },
                   { label: 'Settings', iconName: 'settings' },
                   { divider: true },
                   { label: 'Profile', iconName: 'user' }
                 ]} 
               />
            </div>
            <div className="w-16 border border-border rounded-lg bg-card">
               <Menu 
                 collapsed
                 items={[
                   { header: 'Main' },
                   { label: 'Dashboard', iconName: 'layout', isActive: true },
                   { label: 'Settings', iconName: 'settings' },
                   { divider: true },
                   { label: 'Profile', iconName: 'user' }
                 ]} 
               />
            </div>
          </div>
          <CodeReveal 
            code={`import { Menu } from 'taibul-ui';

const items = [
  { header: 'Main' },
  { label: 'Dashboard', iconName: 'layout', isActive: true },
  { divider: true },
  { label: 'Settings', iconName: 'settings' }
];

// Standard
<Menu items={items} />

// Collapsed
<Menu items={items} collapsed />`} 
          />
        </Space>
      </section>

      <section id="dividers" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Dividers</Heading>
        <Space direction="vertical" gap={48}>
          <Space direction="vertical" gap={16}>
            <Text variant="muted">Standard Dividers</Text>
            <Space direction="vertical" gap={32}>
              <Divider />
              <Divider variant="dashed" />
              <Divider variant="dotted" />
            </Space>
          </Space>

          <Space direction="vertical" gap={16}>
            <Text variant="muted">Dividers with Text</Text>
            <Space direction="vertical" gap={32}>
              <Divider>Continue with</Divider>
              <Divider variant="dashed">Section Break</Divider>
              <Divider variant="dotted">End of Content</Divider>
            </Space>
          </Space>

          <Space direction="vertical" gap={16}>
            <Text variant="muted">Vertical Dividers</Text>
            <div className="flex items-center h-8">
              <Text variant="small">Home</Text>
              <Divider orientation="vertical" />
              <Text variant="small">Products</Text>
              <Divider orientation="vertical" variant="dashed" />
              <Text variant="small">About</Text>
              <Divider orientation="vertical" variant="dotted" />
              <Text variant="small">Contact</Text>
            </div>
          </Space>
          
          <CodeReveal 
            code={`import { Divider } from 'taibul-ui';

// Horizontal (Default)
<Divider />
<Divider variant="dashed" />

// With Text
<Divider>Section</Divider>

// Vertical
<Divider orientation="vertical" />`} 
          />
        </Space>
      </section>




      <section id="form-user-input" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Form and User Input</Heading>
        
        <Grid fluid className="p-0!">
          <Grid.Row gutter={[12, 12]}>
            {/* Left Column: Selection & Controls */}
            <Grid.Col span={12} lg={5}>
              <Space direction="vertical" gap={48}>
                
                {/* Selection Section */}
                <div>
                  <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border">
                    <Filter size={18} className="text-muted-foreground" />
                    <Heading level={4} className="m-0!">Selection & Filtering</Heading>
                  </div>
                  <Space direction="vertical" gap={24}>
                    <div>
                      <Combobox 
                        label="Framework"
                        placeholder="Search frameworks..."
                        options={frameworks}
                        value={comboboxValue}
                        onChange={setComboboxValue}
                        required
                      />
                      <Text variant="small" className="text-muted-foreground mt-2">Single select with search filtering.</Text>
                    </div>
                    
                    <div>
                      <Combobox 
                        label="Tech Stack"
                        placeholder="Select technologies..."
                        options={frameworks}
                        value={multiComboboxValue}
                        onChange={setMultiComboboxValue}
                        multi
                      />
                      <Text variant="small" className="text-muted-foreground mt-2">Multi-select with removable tags.</Text>
                    </div>
                  </Space>
                  <CodeReveal 
                    code={`import { Combobox } from 'taibul-ui';

// Single Select (Controlled)
<Combobox 
  label="Framework" 
  options={[{ label: 'Next.js', value: 'nextjs' }]}
  value={value}
  onChange={(val, e) => console.log(val)} 
/>

// Multi Select (Uncontrolled) - returns array
<Combobox 
  label="Tech Stack"
  multi 
  defaultValue={['react', 'ts']}
  options={frameworks}
  onChange={(vals) => console.log('Selected:', vals)} 
/>`}
                  />
                </div>

                {/* Native Select */}
                <div>
                   <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border">
                    <Icon name="chevron-down" size={18} className="text-muted-foreground" />
                    <Heading level={4} className="m-0!">Native Select</Heading>
                  </div>
                  <Space direction="vertical" gap={24}>
                    <Select 
                      label="Native Browser Selection"
                      options={[
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                        { label: 'Option 3', value: '3' },
                      ]} 
                    />
                    <CodeReveal 
                       code={`import { Select } from 'taibul-ui';

// Uses native <select> element
<Select 
  label="Native Select"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ]} 
/>`}
                    />
                  </Space>
                </div>

                {/* Toggles & Options Section */}
                <div>
                   <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border">
                    <CheckCircle size={18} className="text-muted-foreground" />
                    <Heading level={4} className="m-0!">Toggles & Options</Heading>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <Space direction="vertical" gap={16}>
                      <Text className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Booleans</Text>
                      <Space direction="vertical" gap={12}>
                        <Checkbox label="Accept terms" defaultChecked />
                        <Checkbox label="Subscribe" />
                        <Switch label="Notifications" defaultChecked />
                        <Switch label="Dark Mode" />
                      </Space>
                    </Space>
                    
                    <Space direction="vertical" gap={16}>
                      <Text className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Choice</Text>
                      <RadioGroup 
                        name="demo-radio"
                        value={radioValue}
                        onChange={setRadioValue}
                        options={[
                          { label: 'Standard', value: 'option-1' },
                          { label: 'Express', value: 'option-2' },
                          { label: 'Pickup', value: 'option-3' },
                        ]}
                      />
                    </Space>
                  </div>
                  <CodeReveal 
                    code={`import { Checkbox, Switch, RadioGroup } from 'taibul-ui';

// Boolean Inputs (val: boolean, e: ChangeEvent)
<Checkbox 
  label="Accept terms" 
  onChange={(checked, e) => console.log(checked)} 
/>

<Switch 
  label="Notifications" 
  defaultChecked 
  onChange={(active) => console.log(active)} 
/>

// Radio Group (val: string, e: ChangeEvent)
<RadioGroup 
  name="plan"
  defaultValue="basic"
  options={[
    { label: 'Basic', value: 'basic' }, 
    { label: 'Pro', value: 'pro' }
  ]} 
  onChange={(value) => console.log(value)}
/>`}
                  />
                </div>

              </Space>
            </Grid.Col>

            {/* Right Column: Text Inputs */}
            <Grid.Col span={12} lg={7}>
              <Space direction="vertical" gap={48}>
                
                {/* Text Entry Section */}
                <div>
                  <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border">
                    <Icon name="input" size={18} className="text-muted-foreground" />
                    <Heading level={4} className="m-0!">Text Input</Heading>
                  </div>
                  
                  <Space direction="vertical" gap={24}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input 
                        label="Email Address" 
                        placeholder="hello@example.com" 
                        required
                      />
                      <Input 
                        label="Password" 
                        type="password" 
                        defaultValue="password123"
                        error="Your password is too weak."
                      />
                    </div>
                    
                    <div className="p-6 bg-muted/30 rounded-lg border border-border/50">
                      <Text className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-4">Formatted Input Patterns</Text>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input 
                          label="Phone Number" 
                          placeholder="555-555-5555" 
                          format="NNN-NNN-NNNN"
                        />
                        <Input 
                          label="Credit Card" 
                          placeholder="0000 0000 0000 0000" 
                          format="NNNN NNNN NNNN NNNN"
                        />
                        <Input 
                          label="Date (MM/DD/YYYY)" 
                          placeholder="MM/DD/YYYY" 
                          format="NN/NN/NNNN"
                        />
                        <Input 
                          label="License Plate" 
                          placeholder="ABC-123" 
                          format="LLL-NNN"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <TextArea 
                        label="Bio" 
                        placeholder="Tell us a little bit about yourself..." 
                        maxCharacters={200}
                        rows={4}
                        value={textAreaValue}
                        onChange={(val: string) => setTextAreaValue(val)}
                      />
                    </div>

                  </Space>
                  <CodeReveal 
                    code={`import { Input, TextArea } from 'taibul-ui';

// Standard Input (val: string, e: ChangeEvent)
<Input 
  label="Email" 
  placeholder="user@example.com" 
  onChange={(val, e) => console.log(val)}
/>

<Input 
  label="Password" 
  type="password" // Includes built-in visibility toggle
  placeholder="Enter password"
/>

// Formatted Input
<Input 
  label="Date" 
  format="NN/NN/NNNN" 
  placeholder="MM/DD/YYYY"
/>

// TextArea with auto-resize & limits
<TextArea 
  label="Bio" 
  maxCharacters={200} 
  rows={4} 
  defaultValue="I am a developer..."
  onChange={(val) => console.log(val.length)}
/>`}
                  />
                </div>

              </Space>
            </Grid.Col>
          </Grid.Row>

          <div className="mt-12">
             <Divider className="mb-8" />
             <div className="space-y-4">
               <Space className="mb-2" align="center" gap={8}>
                 <Heading level={4} className="m-0 text-base">Inline Content Editing</Heading>
               </Space>
               <ContentEditable 
                 value={contentEditableValue} 
                 onChange={setContentEditableValue} 
                 placeholder="Type something..."
               />
               <CodeReveal 
                 code={`import { ContentEditable } from 'taibul-ui';

// Inline-flex content editing
<ContentEditable 
  value={value} 
  onChange={setValue} 
/>`}
               />
             </div>
          </div>


          
          <Divider className="my-16" />

          {/* Advanced Inputs Section (Date, Sliders, Files) */}
           <Space direction="vertical" gap={64}>
             
             {/* Pickers */}
             <div>
               <div className="flex items-center gap-2 mb-8">
                  <Icon name="calendar" size={20} className="text-primary" />
                  <Heading level={3} className="m-0!">Pickers & Ranges</Heading>
               </div>
               
               <Grid.Row gutter={[6, 6]}>
                  <Grid.Col span={12} xl={8}>
                    <div className="space-y-6">
                       <Text className="font-medium border-b border-border pb-2 block">Date & Time Pickers</Text>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <DatePicker 
                            label="Date Picker"
                            mode="date"
                            value={dateValue}
                            onChange={setDateValue}
                          />
                          <DatePicker 
                            label="Time Picker"
                            mode="time"
                            value={timeValue}
                            onChange={setTimeValue}
                          />
                          <DatePicker 
                            label="Date & Time"
                            mode="datetime"
                            value={datetimeValue}
                            onChange={setDatetimeValue}
                          />
                          <DatePicker 
                            label="Range Picker"
                            mode="range"
                            value={rangeValue}
                            onChange={setRangeValue}
                          />
                       </div>

                       <CodeReveal 
                          code={`import { DatePicker } from 'taibul-ui';

// Date Picker (val: DateValue)
<DatePicker 
  mode="date" 
  label="Date" 
  onChange={(date) => console.log(date)} 
/>

<DatePicker mode="time" label="Time" />

// Range Picker
<DatePicker 
  mode="range" 
  label="Range" 
  defaultValue={{ from: new Date(), to: undefined }}
/>`}
                        />
                    </div>
                  </Grid.Col>

                  <Grid.Col span={12} xl={4}>
                     <div className="space-y-6">
                        <Text className="font-medium border-b border-border pb-2 block">Inline Calendar</Text>
                        <div className="border border-border rounded-lg overflow-hidden w-fit mx-auto bg-card">
                           <Calendar 
                             selected={new Date()}
                             className="rounded-md border"
                           />
                        </div>
                        <CodeReveal 
                           code={`import { Calendar } from 'taibul-ui';

// Standalone Calendar Component
<Calendar 
  selected={date} 
  onSelect={setDate} 
  className="rounded-md border"
/>`} 
                        />
                     </div>
                  </Grid.Col>

                  <Grid.Col span={12}>
                     <div className="space-y-6">
                       <Text className="font-medium border-b border-border pb-2 block">Sliders</Text>
                       <div className="space-y-8 pt-2">
                          <Slider 
                            label="Volume Control"
                            value={sliderValue}
                            onChange={(v) => setSliderValue(v as number)}
                            min={0}
                            max={100}
                          />
                          <Slider 
                            label="Price Range"
                            value={rangeSliderValue}
                            onChange={(v) => setRangeSliderValue(v as [number, number])}
                            min={0}
                            max={1000}
                            step={10}
                            unit="$"
                          />
                          <div className="grid grid-cols-2 gap-4">
                             <Slider 
                                label="Steps (0-10)"
                                defaultValue={5}
                                min={0}
                                max={10}
                                step={1}
                              />
                             <Slider 
                                label="Percent"
                                value={percentSliderValue}
                                onChange={(v) => setPercentSliderValue(v as number)}
                                min={0}
                                max={100}
                                step={10}
                                unit="%"
                              />
                          </div>
                      </div>
                      <CodeReveal 
                        code={`import { Slider } from 'taibul-ui';

// 1. Single Point Slider
// Pass a single number to 'value' or 'defaultValue' to create a standard slider
<Slider 
  label="Volume" 
  defaultValue={50} 
  onChange={(val) => console.log('Volume:', val)} // returns number
/>

// 2. Range Slider
// Pass an array [start, end] to 'value' or 'defaultValue' to create a range slider
<Slider 
  label="Price Range"
  defaultValue={[20, 80]} 
  min={0}
  max={100}
  step={10}
  onChange={(range) => console.log('Range:', range)} // returns [number, number]
/>`}
                      />
                    </div>
                  </Grid.Col>
               </Grid.Row>
             </div>

             {/* Color Picker */}
             <div>
                <div className="flex items-center gap-2 mb-8">
                  <Icon name="palette" size={20} className="text-primary" />
                  <Heading level={3} className="m-0!">Color Picker</Heading>
               </div>
               <div className="mb-6">
                 <Text>
                   A user-friendly color selection tool with preset palette and hex input.
                 </Text>
               </div>
               <Grid.Row gutter={[24, 24]}>
                 <Grid.Col span={12} md={6}>
                   <div className="space-y-4">
                      <ColorPicker 
                        label="Brand Color"
                        value="#2563eb"
                        onChange={(v) => console.log(v)}
                      />
                   </div>
                 </Grid.Col>
                 <Grid.Col span={12} md={6}>
                   <div className="space-y-4">
                      <ColorPicker 
                        label="Accent Color"
                        value="#f59e0b"
                        onChange={(v) => console.log(v)}
                      />
                   </div>
                 </Grid.Col>
               </Grid.Row>
               <CodeReveal 
                 code={`import { ColorPicker } from 'taibul-ui';

<ColorPicker 
  label="Brand Color"
  value="#2563eb" 
  onChange={(color) => console.log(color)}
/>`}
               />
             </div>

             {/* File Upload */}
             <div>
                <div className="flex items-center gap-2 mb-8">
                  <Icon name="upload" size={20} className="text-primary" />
                  <Heading level={3} className="m-0!">File Upload</Heading>
               </div>
               <Grid.Row gutter={[8, 8]}>
                 <Grid.Col span={12} md={5}>
                   <FileUploader 
                     variant="button" 
                     label="Upload Profile Picture" 
                     description="JPG, PNG or GIF. Max 2MB."
                     accept="image/*"
                     maxSize={2 * 1024 * 1024}
                   />
                 </Grid.Col>
                 <Grid.Col span={12} md={7}>
                   <FileUploader 
                     variant="dropzone" 
                     label="Project Assets" 
                     description="Upload multiple architectural files or documents"
                     multiple
                   />
                 </Grid.Col>
               </Grid.Row>
               <CodeReveal 
                 code={`import { FileUploader } from 'taibul-ui';

// Button Variant (files: File[])
<FileUploader 
  variant="button" 
  label="Upload Image" 
  accept="image/*" 
  maxSize={5000000} // 5MB
  onChange={(files) => console.log('Files:', files)}
/>

// Dropzone Variant
<FileUploader 
  variant="dropzone" 
  label="Asset Library" 
  multiple 
  description="Drag & drop your assets here"
/>`}
               />
             </div>

           </Space>
        </Grid>
       </section>





      <section id="buttons" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Buttons</Heading>
        <Space direction="vertical" gap={32}>
          <Space wrap gap={16} align="center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </Space>
          <Space wrap gap={16} align="center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Space>
          <Space wrap gap={16} align="center">
            <Button isLoading>Loading</Button>
            <Button variant="outline" isLoading>Outline Loading</Button>
            <Button disabled>Disabled</Button>
          </Space>
          <CodeReveal 
            code={`import { Button } from 'taibul-ui';

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button size="sm">Small</Button>
<Button isLoading>Loading</Button>
<Button disabled>Disabled</Button>`}
          />
        </Space>
      </section>

      <section id="progress-systems" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Progress Systems</Heading>
        <Grid.Row gutter={12}>
          <Grid.Col span={12} md={6} className="space-y-6">
            <Progress value={dynamicProgress} showValue variant="primary" />
            <Space gap={16}>
              <Progress value={100} variant="success" size="sm" />
              <Progress value={75} variant="warning" size="sm" />
              <Progress value={45} variant="error" size="sm" />
            </Space>
          </Grid.Col>
          <Grid.Col span={12} md={6} className="flex items-center gap-8">
            <Space gap={32} align="center">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <div className="p-2 bg-foreground rounded">
                 <Spinner variant="white" />
              </div>
              <Spinner variant="muted" />
            </Space>
          </Grid.Col>
        </Grid.Row>
        
        <CodeReveal 
          code={`import { Progress, Spinner } from 'taibul-ui';

// Progress
<Progress value={50} showValue />
<Progress value={75} variant="warning" />

// Spinner
<Spinner size="md" />
<Spinner variant="muted" />
<Spinner variant="white" />`}
        />
      </section>

      <section id="containers-cards" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Containers & Cards</Heading>
        <Grid.Row gutter={8}>
          <Grid.Col span={12} md={6}>
            <Card>
              <Card.Header>
                <Heading level={3} className="m-0!">Project Alpha</Heading>
              </Card.Header>
              <Card.Content>
                <Text className="m-0!">This is a standard card component used for grouping content into logical sections.</Text>
              </Card.Content>
              <Card.Footer className="flex justify-end gap-2">
                <Button size="sm" variant="outline">View Details</Button>
              </Card.Footer>
            </Card>
          </Grid.Col>

          <Grid.Col span={12} md={6}>
            <Card className="border-primary/20 bg-primary/5">
              <Card.Header>
                <div className="flex items-center gap-2">
                  <Settings size={18} className="text-primary" />
                  <Heading level={3} className="m-0!">Dynamic Card</Heading>
                </div>
              </Card.Header>
              <Card.Content>
                <Text className="m-0!">Cards can be customized with different background tints and borders to indicate state.</Text>
              </Card.Content>
            </Card>
          </Grid.Col>
        </Grid.Row>
        
        <CodeReveal 
            code={`import { Card, Heading, Text } from 'taibul-ui';

<Card>
  <Card.Header>
    <Heading level={3}>Card Title</Heading>
  </Card.Header>
  <Card.Content>
    <Text>Content goes here.</Text>
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>`} 
        />
      </section>

      <section id="tags-badges" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Tags & Badges</Heading>
        <Space direction="vertical" gap={32}>
          <Space wrap gap={12} align="center">
            <Tag variant="primary">Primary</Tag>
            <Tag variant="secondary">Secondary</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="error">Error</Tag>
            <Tag variant="outline">Outline</Tag>
          </Space>

          <Space wrap gap={12} align="center">
            <Tag variant="blue">Blue</Tag>
            <Tag variant="purple">Purple</Tag>
            <Tag variant="pink">Pink</Tag>
            <Tag variant="indigo">Indigo</Tag>
            <Tag variant="gray">Gray</Tag>
            <Tag variant="red">Rose</Tag>
            <Tag variant="green">Emerald</Tag>
            <Tag variant="yellow">Amber</Tag>
          </Space>

          <Space wrap gap={12} align="center">
            <Tag variant="primary" leftIcon={TagIcon}>Design System</Tag>
            <Tag variant="success" leftIcon={CheckCircle}>Verified</Tag>
            <Tag variant="warning" leftIcon={AlertCircle}>Pending</Tag>
            <Tag variant="error" leftIcon={Info}>Critical</Tag>
          </Space>

          <Space wrap gap={12} align="center">
            <Tag size="sm" variant="secondary" onClose={() => {}}>Small Tag</Tag>
            <Tag size="md" variant="secondary" onClose={() => {}}>Medium Tag</Tag>
            <Tag variant="primary" rightIcon={ChevronRight}>Action Tag</Tag>
          </Space>

          <CodeReveal 
            code={`import { Tag } from 'taibul-ui';

<Tag variant="primary">Primary</Tag>
<Tag variant="success" leftIcon={CheckCircle}>Verified</Tag>
<Tag variant="primary" rightIcon={ChevronRight}>Action</Tag>
<Tag size="sm" onClose={() => {}}>Dismiss</Tag>`}
          />

          <Divider className="my-4" />
          
          <Space direction="vertical" gap={16}>
            <Text variant="muted">Avatars</Text>
            <Space gap={24} align="center" wrap>
              <Space gap={12} align="center">
                <Avatar size="sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" />
                <Avatar size="md" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" />
                <Avatar size="lg" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" />
              </Space>
              
              <div className="h-8 w-px bg-border hidden sm:block" />
              
              <Space gap={12} align="center">
                <Avatar size="sm" name="Alex Rivera" />
                <Avatar size="md" name="Sarah Chen" />
                <Avatar size="lg" name="Jordan Smyth" />
              </Space>

              <div className="h-8 w-px bg-border hidden sm:block" />

              <Space gap={12} align="center">
                <Avatar size="sm" />
                <Avatar size="md" />
                <Avatar size="lg" />
              </Space>
            </Space>
          </Space>
          <CodeReveal 
            code={`import { Avatar } from 'taibul-ui';

<Avatar size="md" src="image.jpg" />
<Avatar size="md" name="John Doe" />
<Avatar size="md" />`}
          />
        </Space>

      </section>

      <section id="icons-buttons" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-4">Icons & Buttons</Heading>
        <Text className="mb-8 text-muted-foreground max-w-3xl">
          We use the <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 hover:text-foreground transition-colors">Lucide React</a> icon set, but the component also accepts custom icons.
        </Text>
        <Space direction="vertical" gap={48}>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
            {(Object.keys(StandardIcons) as IconName[]).map((name) => (
              <Space key={name} direction="vertical" gap={12} align="center" className="group w-full">
                <div className="p-3 rounded-lg bg-accent/50 group-hover:bg-accent transition-colors text-foreground">
                  <Icon name={name} size={24} />
                </div>
                <Text variant="small" className="text-center font-mono text-xs w-full truncate">{name}</Text>
              </Space>
            ))}
          </div>
          <Space wrap gap={16}>
            <Button leftIcon={Plus}>Create New</Button>
            <Button variant="outline" leftIcon={Search}>Search</Button>
            <Button variant="ghost" isLoading>Processing</Button>
          </Space>
          <CodeReveal 
            code={`import { Button, Icon } from 'taibul-ui';
import { Plus, Search } from 'lucide-react';

<Icon name="activity" size={24} />

// Button with Icons
<Button leftIcon={Plus}>Create New</Button>
<Button variant="outline" rightIcon={Search}>Search</Button>`}
          />
        </Space>
      </section>

      <section id="modals" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Modals</Heading>
        <Space wrap gap={16} align="center" className="mb-8">
          <Button onClick={() => setIsModalOpen(true)}>Launch Modal</Button>
          <Button onClick={() => setIsConfirmOpen(true)}>Confirm Dialog</Button>
          <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => setIsDestructiveConfirmOpen(true)}>Confirm with Input</Button>
        </Space>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Header onClose={() => setIsModalOpen(false)}>Example Modal</Modal.Header>
          <Modal.Content>
            <Text>This is a modular modal that matches your design system perfectly.</Text>
          </Modal.Content>
          <Modal.Footer onClose={() => setIsModalOpen(false)}>
            <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
          </Modal.Footer>
        </Modal>

        <Confirm 
          isOpen={isConfirmOpen}
          title="Delete Item?"
          prompt="Are you sure you want to delete this item? This action cannot be undone."
          okText="Delete"
          onConfirm={() => {
            toast('Deleted', 'Item has been deleted', 'success');
            setIsConfirmOpen(false);
          }}
          onCancel={() => setIsConfirmOpen(false)}
        />

        <Confirm 
          isOpen={isDestructiveConfirmOpen}
          title="Delete Project Project X?"
          prompt="This action will permanently delete the project 'Project X' and all associated data. This action cannot be undone."
          okText="Delete Project"
          cancelText="Cancel"
          confirmTextInput="delete Project X"
          onConfirm={() => {
            toast('Project Deleted', 'Project X has been permanently deleted', 'success');
            setIsDestructiveConfirmOpen(false);
          }}
          onCancel={() => setIsDestructiveConfirmOpen(false)}
        />

        <CodeReveal 
            code={`import { Modal, Confirm } from 'taibul-ui';

const [isOpen, setIsOpen] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

// Standard Modal
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} width="40rem">
  <Modal.Header onClose={() => setIsOpen(false)}>Title</Modal.Header>
  <Modal.Content>Content</Modal.Content>
  <Modal.Footer>
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </Modal.Footer>
</Modal>

// Confirm Dialog
<Confirm 
  isOpen={showConfirm}
  title="Delete Item?"
  prompt="Are you sure? This cannot be undone."
  okText="Delete"
  onConfirm={() => {
    deleteItem(); 
    setShowConfirm(false);
  }}
  onCancel={() => setShowConfirm(false)}
/>

// Destructive Confirm with Input
<Confirm 
  isOpen={showDestructiveConfirm}
  title="Delete Project?"
  prompt="This will delete Project X and all associated data. This action cannot be undone."
  confirmTextInput="Delete Project X"
  okText="Delete Project"
  onConfirm={handleDelete}
  onCancel={close}
/>`}
        />
      </section>

      <section id="toasts" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Toasts</Heading>
        <Space wrap gap={12} className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => toast('Success', 'Action completed successfully', 'success')}
            leftIcon={CheckCircle}
          >
            Success Toast
          </Button>
          <Button 
            variant="outline" 
            onClick={() => toast('Warning', 'Please check your input', 'warning')}
            leftIcon={AlertCircle}
          >
            Warning Toast
          </Button>
          <Button 
            variant="outline" 
            onClick={() => toast('Error', 'Something went wrong', 'error')}
            leftIcon={Info}
          >
            Error Toast
          </Button>
        </Space>
        
        <CodeReveal 
            code={`import { useToast } from 'taibul-ui';

const { toast } = useToast();

<Button 
  onClick={() => toast('Title', 'Message', 'success')}
>
  Show Toast
</Button>`}
        />
      </section>

      <section id="tooltips" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Tooltips</Heading>
        <Space direction="vertical" gap={16} className="mt-8 w-full">
          <Space wrap gap={32} justify="center" align="center" className="p-12 border border-border rounded-lg bg-card/30">
            <Tooltip content="Tooltip on Top" position="top">
              <Button variant="outline" size="sm">Top</Button>
            </Tooltip>
            <Tooltip content="Tooltip on Bottom" position="bottom">
              <Button variant="outline" size="sm">Bottom</Button>
            </Tooltip>
            <Tooltip content="Tooltip on Left" position="left">
              <Button variant="outline" size="sm">Left</Button>
            </Tooltip>
            <Tooltip content="Tooltip on Right" position="right">
              <Button variant="outline" size="sm">Right</Button>
            </Tooltip>
          </Space>
          <CodeReveal 
            code={`import { Tooltip } from 'taibul-ui';

// Tooltip
<Tooltip content="Tooltip Text" delay={200}>
  <Button>Hover Me</Button>
</Tooltip>

<Tooltip content="Left aligned" position="left">
  <Button>Left</Button>
</Tooltip>`}
          />
        </Space>
      </section>


      <section id="tabs-system" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Tabs System</Heading>
        <Space direction="vertical" gap={48}>
          <Space direction="vertical" gap={16}>
            <Text variant="muted">Basic Underline Tabs</Text>
            <Tabs defaultValue="account">
              <Tabs.List>
                <Tabs.Trigger value="account">Account</Tabs.Trigger>
                <Tabs.Trigger value="password">Password</Tabs.Trigger>
                <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="account">
                <div className="py-2">
                  <Heading level={4} className="mb-2 text-foreground">Account Settings</Heading>
                  <Text>Manage your account settings and preferences here.</Text>
                </div>
              </Tabs.Content>
              <Tabs.Content value="password">
                <div className="py-2">
                  <Heading level={4} className="mb-2 text-foreground">Password Management</Heading>
                  <Text>Change your password or enable two-factor authentication.</Text>
                </div>
              </Tabs.Content>
              <Tabs.Content value="settings">
                <div className="py-2">
                  <Heading level={4} className="mb-2 text-foreground">General Preferences</Heading>
                  <Text>Configure your general system and notification preferences.</Text>
                </div>
              </Tabs.Content>
            </Tabs>
          </Space>

          <Space direction="vertical" gap={16}>
            <Text variant="muted">Tabs with Icons</Text>
            <Tabs defaultValue="profile">
              <Tabs.List>
                <Tabs.Trigger value="profile" icon={User}>Profile</Tabs.Trigger>
                <Tabs.Trigger value="security" icon={Settings}>Security</Tabs.Trigger>
                <Tabs.Trigger value="alerts" icon={Bell}>Notifications</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="profile">
                <div className="py-2">
                  <Text>User profile management dashboard.</Text>
                </div>
              </Tabs.Content>
              <Tabs.Content value="security">
                <div className="py-2">
                  <Text>Security and privacy controls.</Text>
                </div>
              </Tabs.Content>
              <Tabs.Content value="alerts">
                <div className="py-2">
                  <Text>Configure how you receive alerts.</Text>
                </div>
              </Tabs.Content>
            </Tabs>
          </Space>
          <Space direction="vertical" gap={16}>
             <Text variant="muted">Icon Position & Disabled States</Text>
             <Tabs defaultValue="1">
               <Tabs.List>
                 <Tabs.Trigger value="1" icon={Search} iconPosition="right">Right Icon</Tabs.Trigger>
                 <Tabs.Trigger value="2" icon={Bell}>Left Icon</Tabs.Trigger>
                 <Tabs.Trigger value="3" disabled>Disabled</Tabs.Trigger>
               </Tabs.List>
               <Tabs.Content value="1">
                 <div className="py-2"><Text>Content with right-aligned icon tab.</Text></div>
               </Tabs.Content>
               <Tabs.Content value="2">
                 <div className="py-2"><Text>Content with left-aligned icon tab.</Text></div>
               </Tabs.Content>
             </Tabs>
          </Space>

          <CodeReveal 
            code={`import { Tabs } from 'taibul-ui';

<Tabs defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="settings" icon={Settings}>Settings</Tabs.Trigger>
    <Tabs.Trigger value="search" icon={Search} iconPosition="right">Search</Tabs.Trigger>
    <Tabs.Trigger value="disabled" disabled>Disabled</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account Content</Tabs.Content>
</Tabs>`}
          />
        </Space>
      </section>

      <section id="collapse-system" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Collapse System</Heading>
        <Space direction="vertical" gap={48}>
          
          <Space direction="vertical" gap={16}>
             <Text variant="muted">Basic Collapse (Multiple Open)</Text>
             <Collapse defaultActiveKey={['1']}>
               <Collapse.Panel id="1" header="What is Taibul-UI?">
                  <Text>
                    Taibul-UI is a minimalistic, clean, and modern React component library designed for modern web applications. 
                  </Text>
               </Collapse.Panel>
               <Collapse.Panel id="2" header="How do I install it?">
                  <Text>
                    You can install Taibul-UI using npm or yarn. Simply run `npm install taibul-ui` in your project directory.
                    Make sure you have basic dependencies like React and Tailwind CSS set up.
                  </Text>
               </Collapse.Panel>
               <Collapse.Panel id="3" header="Can I customize the theme?">
                  <Text>
                    Yes! Taibul-UI is built with customization in mind. You can easily adjust colors, spacing, and typography
                    using CSS variables or Tailwind configuration.
                  </Text>
               </Collapse.Panel>
             </Collapse>
          </Space>

          <Space direction="vertical" gap={16}>
             <Text variant="muted">Accordion (One Open at a Time)</Text>
             <Collapse accordion defaultActiveKey="1">
               <Collapse.Panel id="1" header="Section 1" className="bg-muted/10">
                  <Text>
                    This is the content of section 1. In accordion mode, opening another section will automatically
                    close this one. This helps keep the interface clean when you have a lot of content.
                  </Text>
               </Collapse.Panel>
               <Collapse.Panel id="2" header="Section 2" className="bg-muted/10">
                  <Text>
                    This is the content of section 2. Notice how the previous section closed when you opened this one?
                    That's the power of the accordion mode!
                  </Text>
               </Collapse.Panel>
               <Collapse.Panel id="3" header="Section 3" className="bg-muted/10">
                   <Text>
                    And here is Section 3. You can disable items too if needed, though usually standard accordions
                    allow all items to be interactive.
                  </Text>
               </Collapse.Panel>
             </Collapse>
          </Space>
           
          <Space direction="vertical" gap={16}>
             <Text variant="muted">Ghost (Borderless)</Text>
             <Collapse bordered={false} defaultActiveKey="1">
               <Collapse.Panel id="1" header="Minimalist Design">
                  <Text>
                    Use the <code>bordered=false</code> prop to create a cleaner, more minimalist look
                    that blends seamlessly with your background.
                  </Text>
               </Collapse.Panel>
               <Collapse.Panel id="2" header="Seamless Integration">
                  <Text>
                    Perfect for when you want content to feel less "boxed in".
                  </Text>
               </Collapse.Panel>
             </Collapse>
          </Space>

           <CodeReveal 
             code={`import { Collapse } from 'taibul-ui';

// Accordion Mode (one open at a time)
<Collapse accordion defaultActiveKey="1">
  <Collapse.Panel id="1" header="Title 1">Content</Collapse.Panel>
  <Collapse.Panel id="2" header="Title 2">Content</Collapse.Panel>
</Collapse>

// Ghost Mode (No Border)
<Collapse bordered={false} defaultActiveKey="1">
  <Collapse.Panel id="1" header="Ghost Panel">Content</Collapse.Panel>
</Collapse>`}
           />
        </Space>
      </section>

      <section id="data-tables" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Data Tables</Heading>
        <Table 
          columns={tableColumns} 
          data={tableData} 
          pageSize={5}
          onRowClick={(item) => toast('User Selected', `Selected ${item.name}`, 'success')}
        />
        <Space direction="vertical" gap={32}>
           <Text variant="muted">Empty State Example</Text>
           <div className="border border-border rounded-lg overflow-hidden">
             <Table 
               columns={[{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }]} 
               data={[]} 
               emptyMessage="No users found in the database."
             />
           </div>
        </Space>

        <CodeReveal 
          code={`import { Table } from 'taibul-ui';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', render: (val) => <Tag>{val}</Tag> }
];

<Table 
  columns={columns} 
  data={data} 
  pageSize={5}
  onRowClick={(item) => console.log(item)}
/>

// Custom Empty Message
<Table 
  columns={columns} 
  data={[]} 
  emptyMessage="No records found" 
/>`}
        />
      </section>

      <section id="code-markdown" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Code Syntax Highlighting</Heading>
        <Space direction="vertical" gap={48}>
          
          <Space direction="vertical" gap={16}>
            <SyntaxHighlighter
              language="typescript"
              code={`function greeting(name: string) {
  return \`Hello, \${name}!\`;
}

// Usage
console.log(greeting('Developer'));`}
            />

            <CodeReveal 
              code={`import { SyntaxHighlighter } from 'taibul-ui';

<SyntaxHighlighter 
  language="typescript" 
  code={\`function greeting(name: string) {
  return \\\`Hello, \\\${name}!\\\`;
}\`} 
/>`} 
            />
          </Space>

          <Space direction="vertical" gap={16}>
            <Text variant="muted">Markdown Rendering</Text>
              <MarkdownRenderer 
                content={`# Markdown Support
This component renders **markdown** content with automatic syntax highlighting for code blocks.

## Features
- Standard styling for headers, lists, and paragraphs
- **Bold** and *Italic* text support
- Blockquotes and links
- Code blocks with syntax highlighting

\`\`\`javascript
// Example code block
const features = ['markdown', 'syntax-highlighting'];
features.forEach(f => console.log(f));
\`\`\`
`} 
              />
              <CodeReveal 
                code={`import { MarkdownRenderer } from 'taibul-ui';

<MarkdownRenderer 
  content="# Hello World" 
/>`} 
              />
          </Space>

        </Space>
      </section>

      <section id="utilities" className="mb-16 scroll-mt-24">
        <Heading level={2} className="mb-8">Utilities</Heading>
        <Space direction="vertical" gap={48}>
            <Space direction="vertical" gap={16}>
                <Text variant="muted">Copy to Clipboard</Text>
                    <Space gap={8} align="center">
                        <Text className="font-mono text-sm bg-muted px-2 py-1 rounded">some code</Text>
                        <CopyToClipboard text="some code" />
                    </Space>
                    <CopyToClipboard text="Copied from a wrapper!">
                        <Button variant="outline">Click me to Copy</Button>
                    </CopyToClipboard>
            </Space>

            <Space direction="vertical" gap={16}>
                <Text variant="muted">Text Scaling & Ellipsis</Text>
                <div className="grid gap-8 md:grid-cols-2 items-start">
                    <div>
                        <Text variant="small" className="mb-2 text-muted-foreground">Single Line (150px)</Text>
                        <div className="border border-dashed border-border p-2 w-[150px] bg-muted/20 rounded">
                            <TextEllipsis text="This is a very long text that should be truncated." />
                        </div>
                    </div>
                    <div>
                        <Text variant="small" className="mb-2 text-muted-foreground">Multi Line (2 lines)</Text>
                        <div className="border border-dashed border-border p-2 bg-muted/20 rounded">
                            <TextEllipsis 
                                lines={2} 
                                text="This is a longer paragraph that is meant to span multiple lines. It should eventually be truncated after two lines of text so that it does not take up too much vertical space in the UI, keeping your layouts clean and consistent regardless of content length." 
                            />
                        </div>
                    </div>
                </div>
            </Space>

             <Space direction="vertical" gap={16}>
                <Text variant="muted">Keyboard Shortcuts</Text>
                <Space wrap gap={32} align="center">
                    <KeyboardShortcut keys={['⌘', 'K']} />
                    <KeyboardShortcut keys={['Ctrl', 'Shift', 'F']} />
                    <Space gap={8} align="center" className="text-sm text-muted-foreground">
                        <span>Press</span>
                        <KeyboardShortcut keys={['/']} />
                        <span>to search</span>
                    </Space>
                </Space>
            </Space>
            <CodeReveal 
              code={`import { CopyToClipboard, TextEllipsis, KeyboardShortcut } from 'taibul-ui';

// Copy to Clipboard
<CopyToClipboard text="Content to copy" />

// Text Ellipsis
<TextEllipsis text="Very long text..." />
<TextEllipsis lines={2} text="Multi-line text..." />

// Keyboard Shortcut
<KeyboardShortcut keys={['⌘', 'K']} />`}
            />

            <Space direction="vertical" gap={16}>
            <Text variant="muted">Page Position Tracker (ScrollSpy)</Text>
            
            <div className="border border-border rounded-lg bg-card overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                     <Text className="mb-2">
                        The current active section of the page is: <span className="font-bold text-primary">{activeSectionId || 'None'}</span>
                     </Text>
                     <Text variant="small" className="text-muted-foreground">
                        Below is a live "mini-demo" showing how the ScrollSpy works in isolation. Scroll the right panel to see the left menu update.
                    </Text>
                </div>
                
                <ScrollSpyDemo />
            </div>

            <CodeReveal 
              code={`import { useScrollSpy } from 'taibul-ui';

// 1. Create a ref for the scroll container
const containerRef = useRef<HTMLDivElement>(null);

// 2. Define your section IDs
const sectionIds = ['section-1', 'section-2', 'section-3'];

// 3. Use the hook with the container ref
const activeId = useScrollSpy(sectionIds, { 
  offset: 20, 
  containerRef 
});

// 4. Render your navigation and content
return (
  <div className="flex h-64">
    <Sidebar activeId={activeId} />
    <div ref={containerRef} className="overflow-y-auto">
       <Section id="section-1" />
       <Section id="section-2" />
       <Section id="section-3" />
    </div>
  </div>
);`} 
            />
          </Space>
        </Space>
      </section>
          
        </div>
        </Layout.Content>
      </Layout>
      
      <Layout.Footer className="justify-between items-center bg-background border-t">
        <Text variant="small" className="text-muted-foreground">Taibul-UI Design System</Text>
      </Layout.Footer>
    </Layout>
  );
}


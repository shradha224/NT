export const mockIoTData = {
  currentBatch: {
    id: 'TOM-024',
    type: 'Tomato',
    originFarm: 'Sunnyvale Acres, California',
    harvestDate: 'Oct 23, 2023 - 06:00 AM',
    qualityMonitoredDate: 'Oct 23, 2023 - 02:00 PM',
    status: 'In Transit',
  },
  qualitySummary: {
    conditionScore: 82,
    overallQuality: 'Good',
    spoilageRisk: '28%',
    shelfLife: '4 Days'
  },
  latestAssessment: {
    capturedTime: '2 hrs ago',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=85',
    appearance: { status: 'Good', cssClass: 'good' },
    ripeness: { status: 'Optimal', cssClass: 'good' },
    defects: { status: 'Minimal', cssClass: 'neutral' },
    sizeUniformity: { status: 'Consistent', cssClass: 'good' }
  },
  sensorReadings: {
    temperature: {
      current: '24.2',
      unit: '°C',
      status: 'Warning',
      alertMessage: 'Temperature above preferred range',
      peak: '28.4°C'
    },
    humidity: {
      current: '68',
      unit: '%',
      status: 'Optimal',
      peak: '74%'
    },
    ethylene: {
      current: '1.2',
      unit: 'ppm',
      status: 'Optimal',
      peak: '1.5 ppm'
    },
    light: {
      current: '450',
      unit: 'lux',
      status: 'Optimal',
      peak: '500 lux'
    },
    soilMoisture: {
      current: '42',
      unit: '%',
      status: 'Optimal',
      peak: '45%'
    },
    voc: {
      current: '412',
      unit: 'ppm',
      status: 'Normal',
      peak: '450 ppm'
    }
  },
  visualMetrics: {
    appearance: 'Good',
    ripeness: { value: '76%', cssClass: 'orange' },
    colourChange: 'Low',
    visibleDefects: 'Low',
    bruising: 'Minimal',
    deterioration: { value: 'Early', cssClass: 'orange' }
  },
  aiInsights: {
    confidence: '91%',
    analysisText: 'Deterioration is increasing gradually based on visual and environmental signals. The combination of slightly elevated VOC and early visual ripening signs suggests the batch will reach peak maturity sooner than initially projected.',
    storageStatus: 'Favourable',
    assessmentSummary: '"Current conditions indicate good quality with a relatively low spoilage risk."',
    recommendation: 'Prioritize this batch for sale within 2 days.'
  },
  qualityHistory: [
    { day: 'Today (Day 4)', result: 'Good' },
    { day: 'Today (Day 4)', result: 'Good' },
    { day: 'Yesterday (Day 3)', result: 'Good' },
    { day: 'Yesterday (Day 3)', result: 'Good' },
    { day: 'Yesterday (Day 3)', result: 'Good' },
    { day: 'Oct 24 (Day 2)', result: 'Excellent' },
    { day: 'Oct 23 (Day 1)', result: 'Fresh Picked' }
  ],
  journey: [
    { step: 1, title: 'Harvested', score: '96', statusText: 'Fresh', cssClass: 'completed', tagClass: 'fresh' },
    { step: 2, title: 'Monitoring', score: '92', statusText: 'Stable', cssClass: 'completed', tagClass: 'stable' },
    { step: 3, title: 'Today', score: '82', statusText: 'Monitor', cssClass: 'current', tagClass: 'monitor' },
    { step: 4, title: 'Projected', score: '74', statusText: 'Projected', cssClass: 'projected', tagClass: 'projected-tag' },
    { step: 5, title: 'Projected', score: '65', statusText: 'Projected', cssClass: 'projected', tagClass: 'projected-tag' }
  ],
  trajectory: {
    message: 'Trajectory: Deterioration is increasing gradually.',
    values: ['96', '92', '82', '74', '65']
  }
};

export const mockDashboardData = {
  user: 'Sarah',
  farmerUser: 'Rajesh',
  activeBatches: [
    { id: 'TOM-024', status: 'Warning', alert: 'Temperature above preferred range' }
  ],
  previousBatches: [
    { id: 'TOM-021', type: 'Tomato', lastMonitored: 'Oct 10', score: '88' },
    { id: 'TOM-022', type: 'Tomato', lastMonitored: 'Oct 12', score: '72' },
    { id: 'TOM-023', type: 'Tomato', lastMonitored: 'Oct 18', score: '91' }
  ],
  comparison: {
    currentScore: '82',
    compareScore: '86',
    compareId: 'TOM-023',
    warning: 'Current batch is deteriorating slightly faster than TOM-023.'
  },
  systemStatus: {
    connected: true,
    lastSync: '2 min ago',
    sensors: {
      device: 'green',
      camera: 'green',
      temperature: 'orange',
      humidity: 'green',
      voc: 'green'
    }
  }
};

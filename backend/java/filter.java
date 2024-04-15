import weka.core.Attribute;
import weka.core.Capabilities;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.core.Instances;
import weka.core.Utils;
import weka.filters.Filter;
import java.util.ArrayList;

public class filter
  extends Filter {

  /**
   * Returns only the toString() method.
   *
   * @return a string describing the filter
   */
  public String globalInfo() {
    return toString();
  }

  /**
   * Returns the capabilities of this filter.
   *
   * @return the capabilities
   */
  public Capabilities getCapabilities() {
    weka.core.Capabilities result = new weka.core.Capabilities(this);

    result.enable(weka.core.Capabilities.Capability.NOMINAL_ATTRIBUTES);
    result.enable(weka.core.Capabilities.Capability.NUMERIC_ATTRIBUTES);
    result.enable(weka.core.Capabilities.Capability.DATE_ATTRIBUTES);
    result.enable(weka.core.Capabilities.Capability.STRING_ATTRIBUTES);
    result.enable(weka.core.Capabilities.Capability.RELATIONAL_ATTRIBUTES);
    result.enable(weka.core.Capabilities.Capability.MISSING_VALUES);
    result.enable(weka.core.Capabilities.Capability.NO_CLASS);
    result.enable(weka.core.Capabilities.Capability.NOMINAL_CLASS);
    result.enable(weka.core.Capabilities.Capability.UNARY_CLASS);
    result.enable(weka.core.Capabilities.Capability.EMPTY_NOMINAL_CLASS);
    result.enable(weka.core.Capabilities.Capability.NUMERIC_CLASS);
    result.enable(weka.core.Capabilities.Capability.DATE_CLASS);
    result.enable(weka.core.Capabilities.Capability.STRING_CLASS);
    result.enable(weka.core.Capabilities.Capability.RELATIONAL_CLASS);
    result.enable(weka.core.Capabilities.Capability.MISSING_CLASS_VALUES);


    result.setMinimumNumberInstances(0);

    return result;
  }

  /**
   * turns array of Objects into an Instance object
   *
   * @param obj the Object array to turn into an Instance
   * @param format      the data format to use
   * @return            the generated Instance object
   */
  protected Instance objectsToInstance(Object[] obj, Instances format) {
    Instance            result;
    double[]            values;
    int         i;

    values = new double[obj.length];

    for (i = 0 ; i < obj.length; i++) {
      if (obj[i] == null)
        values[i] = Utils.missingValue();
      else if (format.attribute(i).isNumeric())
        values[i] = (Double) obj[i];
      else if (format.attribute(i).isNominal())
        values[i] = format.attribute(i).indexOfValue((String) obj[i]);
    }

    // create new instance
    result = new DenseInstance(1.0, values);
    result.setDataset(format);

    return result;
  }

  /**
   * turns the Instance object into an array of Objects
   *
   * @param inst        the instance to turn into an array
   * @return            the Object array representing the instance
   */
  protected Object[] instanceToObjects(Instance inst) {
    Object[]    result;
    int         i;

    result = new Object[inst.numAttributes()];

    for (i = 0 ; i < inst.numAttributes(); i++) {
      if (inst.isMissing(i))
        result[i] = null;
      else if (inst.attribute(i).isNumeric())
        result[i] = inst.value(i);
      else
        result[i] = inst.stringValue(i);
    }

    return result;
  }

  /**
   * turns the Instances object into an array of Objects
   *
   * @param data        the instances to turn into an array
   * @return            the Object array representing the instances
   */
  protected Object[][] instancesToObjects(Instances data) {
    Object[][]  result;
    int         i;

    result = new Object[data.numInstances()][];

    for (i = 0; i < data.numInstances(); i++)
      result[i] = instanceToObjects(data.instance(i));

    return result;
  }

  /**
   * Only tests the input data.
   *
   * @param instanceInfo the format of the data to convert
   * @return always true, to indicate that the output format can
   *         be collected immediately.
   */
  public boolean setInputFormat(Instances instanceInfo) throws Exception {
    super.setInputFormat(instanceInfo);

    // generate output format
    ArrayList<Attribute> atts = new ArrayList<Attribute>();
    ArrayList<String> attValues;
    // n
    atts.add(new Attribute("n"));
    // p
    atts.add(new Attribute("p"));
    // k
    atts.add(new Attribute("k"));
    // temperature
    atts.add(new Attribute("temperature"));
    // humidity
    atts.add(new Attribute("humidity"));
    // ph
    atts.add(new Attribute("ph"));
    // rainfall
    atts.add(new Attribute("rainfall"));
    // label
    attValues = new ArrayList<String>();
    attValues.add("apple");
    attValues.add("banana");
    attValues.add("blackgram");
    attValues.add("chickpea");
    attValues.add("coconut");
    attValues.add("coffee");
    attValues.add("cotton");
    attValues.add("grapes");
    attValues.add("jute");
    attValues.add("kidneybeans");
    attValues.add("lentil");
    attValues.add("maize");
    attValues.add("mango");
    attValues.add("mothbeans");
    attValues.add("mungbean");
    attValues.add("muskmelon");
    attValues.add("orange");
    attValues.add("papaya");
    attValues.add("pigeonpeas");
    attValues.add("pomegranate");
    attValues.add("rice");
    attValues.add("watermelon");
    atts.add(new Attribute("label", attValues));

    Instances format = new Instances("Crop_recommendation-weka.filters.unsupervised.attribute.Normalize-S1.0-T0.0", atts, 0);
    format.setClassIndex(-1);
    setOutputFormat(format);

    return true;
  }

  /**
   * Directly filters the instance.
   *
   * @param instance the instance to convert
   * @return always true, to indicate that the output can
   *         be collected immediately.
   */
  public boolean input(Instance instance) throws Exception {
    Object[] filtered = FilterAlgo.filter(instanceToObjects(instance));
    push(objectsToInstance(filtered, getOutputFormat()));
    return true;
  }

  /**
   * Performs a batch filtering of the buffered data, if any available.
   *
   * @return true if instances were filtered otherwise false
   */
  public boolean batchFinished() throws Exception {
    if (getInputFormat() == null)
      throw new NullPointerException("No input instance format defined");;

    Instances inst = getInputFormat();
    if (inst.numInstances() > 0) {
      Object[][] filtered = FilterAlgo.filter(instancesToObjects(inst));
      for (int i = 0; i < filtered.length; i++) {
        push(objectsToInstance(filtered[i], getOutputFormat()));
      }
    }

    flushInput();
    m_NewBatch = true;
    m_FirstBatchDone = true;

    return (inst.numInstances() > 0);
  }

  /**
   * Returns only the classnames and what filter it is based on.
   *
   * @return a short description
   */
  public String toString() {
    return "Auto-generated filter wrapper, based on weka.filters.unsupervised.attribute.Normalize (generated with Weka 3.8.6).\n" + this.getClass().getName() + "/FilterAlgo";
  }

  /**
   * Runs the filter from commandline.
   *
   * @param args the commandline arguments
   */
  public static void main(String args[]) {
    runFilter(new filter(), args);
  }
}

class FilterAlgo {

  /** lists which attributes will be processed */
  protected final static boolean[] PROCESS = new boolean[]{true,true,true,true,true,true,true,false};

  /** the minimum values for numeric values */
  protected final static double[] MIN = new double[]{0.0,5.0,5.0,8.825674745,14.25803981,3.504752314,20.21126747,Double.NaN};

  /** the maximum values for numeric values */
  protected final static double[] MAX = new double[]{140.0,145.0,205.0,43.67549305,99.98187601,9.93509073,298.5601175,0.0};

  /** the scale factor */
  protected final static double SCALE = 1.0;

  /** the translation */
  protected final static double TRANSLATION = 0.0;

  /**
   * filters a single row
   *
   * @param i the row to process
   * @return the processed row
   */
  public static Object[] filter(Object[] i) {
    Object[] result;

    result = new Object[i.length];
    for (int n = 0; n < i.length; n++) {
      if (PROCESS[n] && (i[n] != null)) {
        if (Double.isNaN(MIN[n]) || (MIN[n] == MAX[n]))
          result[n] = 0;
        else
          result[n] = (((Double) i[n]) - MIN[n]) / (MAX[n] - MIN[n]) * SCALE + TRANSLATION;
      }
      else {
        result[n] = i[n];
      }
    }

    return result;
  }

  /**
   * filters multiple rows
   *
   * @param i the rows to process
   * @return the processed rows
   */
  public static Object[][] filter(Object[][] i) {
    Object[][] result;

    result = new Object[i.length][];
    for (int n = 0; n < i.length; n++) {
      result[n] = filter(i[n]);
    }

    return result;
  }
}
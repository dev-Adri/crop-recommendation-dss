import weka.core.Instances;
import weka.core.converters.ConverterUtils.DataSource;
import weka.core.converters.ArffSaver;
import weka.filters.unsupervised.attribute.Normalize;
import weka.classifiers.trees.RandomForest;
import weka.classifiers.Evaluation;

import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.Arrays;

// compile
// javac -cp ".;weka.jar" predictor.java
// run
// java predictor - java -cp ".;weka.jar" predictor.

public class predictor {
    public static void main(String[] args) throws Exception {
        predictor p = new predictor();

        if (args[0].equals("train")) {
            p.train();
        } else if (args[0].equals("test")) {
            p.test(args[1]);
        }
    }


    public void train() throws Exception {
        DataSource source = new DataSource("./train.arff");
        Instances data = source.getDataSet();
        data.setClassIndex(data.numAttributes() - 1);

        // Create a normalizer
        Normalize normalize = new Normalize();
        normalize.setInputFormat(data);

        // Save the normalizer and its parameters
        
        // Use the normalizer filter that has been saved
        Instances normalizedData = Normalize.useFilter(data, normalize);

        weka.core.SerializationHelper.write("./filtermodel.model", normalize);
        
        // Save the arff file
        ArffSaver saver = new ArffSaver();
        saver.setInstances(normalizedData);
        saver.setFile(new java.io.File("./norm.arff"));
        saver.writeBatch();

        // Create a random forest classifier and save it
        RandomForest rf = new RandomForest();
        rf.buildClassifier(normalizedData);
        weka.core.SerializationHelper.write("./model.model", rf);

        // Load the random forest model to use for evaluation
        RandomForest loadedRf = (RandomForest) weka.core.SerializationHelper.read("./model.model");
        // Load the normalized data
        DataSource testSource = new DataSource("./norm.arff");
        Instances testData = testSource.getDataSet();
        testData.setClassIndex(data.numAttributes() - 1);

        // Evaluate the model
        Evaluation eval = new Evaluation(normalizedData);
        eval.crossValidateModel(loadedRf, testData, 10, new java.util.Random(1));
    }

    public void test(String path) throws Exception {
        // todo: test the classifier here and return result in a file
        DataSource testData = new DataSource(path);
        Instances test = testData.getDataSet();
        test.setClassIndex(test.numAttributes() - 1);

        Normalize normalizer = (Normalize) weka.core.SerializationHelper.read("./filtermodel.model");

        Instances normalizedData = Normalize.useFilter(test, normalizer);
        normalizedData.setClassIndex(test.numAttributes() - 1);

        RandomForest rf = (RandomForest) weka.core.SerializationHelper.read("./model.model");

        Evaluation eval = new Evaluation(normalizedData);

        // Prepare a FileWriter to write the results
        FileWriter fileWriter = new FileWriter("predictions.txt");
        PrintWriter printWriter = new PrintWriter(fileWriter);

        for (int i = 0; i < normalizedData.numInstances(); i++) {
            double[] distribution = rf.distributionForInstance(normalizedData.instance(i));

            // Prepare to print top 3 class probabilities
            int[] indices = getTopIndices(distribution, 3);  // Method to get indices of top 3 values
            for (int idx : indices) {
                printWriter.printf("%s:%.4f%%\n", normalizedData.classAttribute().value(idx), distribution[idx] * 100);
            }
        }

        eval.evaluateModel(rf, normalizedData);

        printWriter.close();
    }

    private static int[] getTopIndices(double[] array, int n) {
        Double[] indices = new Double[array.length];
        for (int i = 0; i < array.length; i++) {
            indices[i] = (double) i;
        }
        Arrays.sort(indices, (i1, i2) -> Double.compare(array[i2.intValue()], array[i1.intValue()]));
        return Arrays.stream(indices).mapToInt(d -> d.intValue()).limit(n).toArray();
    }
}